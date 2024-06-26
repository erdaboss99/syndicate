'use server';

import * as z from 'zod';

import {
	ACTION_ACCOUNT_ALREADY_USED_EMAIL_ERROR,
	ACTION_ACCOUNT_DELETED_SUCCESS,
	ACTION_ACCOUNT_INCORRECT_EMAIL_ERROR,
	ACTION_ACCOUNT_INCORRECT_PASSWORD_ERROR,
	ACTION_ACCOUNT_NOT_FOUND_ERROR,
	ACTION_ACCOUNT_ROLE_CHANGE_SUCCESS,
	ACTION_ACCOUNT_THIRD_PARTY_EDIT_ERROR,
	ACTION_ACCOUNT_UPDATED_SUCCESS,
	ACTION_FORBIDDEN_ERROR,
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_ONLY_ADMIN_ERROR,
} from '@/constants';
import { deleteUniqueUser, getUniqueUser, updateUniqueUser } from '@/data/user';
import { getCurrentUser } from '@/lib/auth';
import { compare, hash } from '@/lib/hash';
import { sendAccountDeletionEmail } from '@/lib/mail';
import { AccountDeleteSchema, AccountEditSchema, RoleChangeSchema } from '@/schemas';

export const editAccount = async (values: z.infer<typeof AccountEditSchema>) => {
	const validatedData = AccountEditSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const user = await getCurrentUser();
	const isOAuth = user?.provider !== 'Credentials';
	if (isOAuth) return { error: ACTION_ACCOUNT_THIRD_PARTY_EDIT_ERROR };

	const { id, name, email, newPassword, confirmPassword, password } = validatedData.data;

	if (user?.id !== id) return { error: ACTION_FORBIDDEN_ERROR };

	const existingUser = await getUniqueUser({
		where: { id: user?.id },
		select: { name: true, email: true, password: true },
	});
	if (!existingUser || !existingUser.email || !existingUser.password || !existingUser.name)
		return { error: ACTION_ACCOUNT_NOT_FOUND_ERROR };

	const passwordMatch = await compare({ data: password, hashedData: existingUser.password });
	if (!passwordMatch) return { error: ACTION_ACCOUNT_INCORRECT_PASSWORD_ERROR };

	const emailChanged = email !== existingUser.email;
	if (emailChanged) {
		const emailConflicts = await getUniqueUser({ where: { email }, select: { id: true } });
		if (emailConflicts) return { error: ACTION_ACCOUNT_ALREADY_USED_EMAIL_ERROR };

		await updateUniqueUser({
			where: { id: user.id },
			data: { email, emailVerified: null },
			select: { id: true },
		});
	}

	const nameChanged = name !== existingUser.name;
	if (nameChanged) {
		await updateUniqueUser({
			where: { id: user.id },
			data: { name },
			select: { id: true },
		});
	}

	if (newPassword && confirmPassword) {
		await updateUniqueUser({
			where: { id: user.id },
			data: { password: await hash(newPassword) },
			select: { id: true },
		});
	}

	return { success: ACTION_ACCOUNT_UPDATED_SUCCESS };
};

export const deleteAccount = async (values: z.infer<typeof AccountDeleteSchema>) => {
	const validatedData = AccountDeleteSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const user = await getCurrentUser();
	const existingUser = await getUniqueUser({
		where: { id: user?.id },
		select: { id: true, email: true },
	});

	const { id, email } = validatedData.data;

	if (user?.id !== id) return { error: ACTION_FORBIDDEN_ERROR };

	if (!existingUser || !existingUser.email) return { error: ACTION_ACCOUNT_NOT_FOUND_ERROR };

	if (existingUser.email !== email) return { error: ACTION_ACCOUNT_INCORRECT_EMAIL_ERROR };

	const deletedUser = await deleteUniqueUser({
		where: { id: existingUser.id },
		select: {
			name: true,
			email: true,
			bookings: {
				select: {
					description: true,
					Appointment: { select: { startTime: true } },
					Issue: { select: { name: true } },
				},
			},
		},
	});

	await sendAccountDeletionEmail({
		userName: deletedUser!.name,
		userEmail: deletedUser!.email,
		deletedAssociatedBookings: deletedUser!.bookings,
	});

	return { success: ACTION_ACCOUNT_DELETED_SUCCESS };
};

export const changeRole = async (values: z.infer<typeof RoleChangeSchema>) => {
	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const validatedData = RoleChangeSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { id } = validatedData.data;

	const existingUser = await getUniqueUser({
		where: { id },
		select: { id: true },
	});
	if (!existingUser) return { error: ACTION_ACCOUNT_NOT_FOUND_ERROR };

	const { role } = validatedData.data;
	await updateUniqueUser({
		where: { id },
		data: { role: role },
		select: { id: true },
	});

	return { success: ACTION_ACCOUNT_ROLE_CHANGE_SUCCESS };
};
