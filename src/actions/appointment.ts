'use server';

import { z } from 'zod';

import {
	ACTION_APPOINTMENT_DELETED_SUCCESS,
	ACTION_APPOINTMENT_DELETE_BOOKED_ERROR,
	ACTION_APPOINTMENT_NOT_FOUND_ERROR,
	ACTION_INVALID_PAYLOAD_ERROR,
	ACTION_ONLY_ADMIN_ERROR,
} from '@/constants';
import { deleteUniqueAppointment, getUniqueAppointment } from '@/data/appointment';
import { getCurrentUser } from '@/lib/auth';
import { AppointmentDeleteSchema } from '@/schemas';

export const deleteAppointment = async (values: z.infer<typeof AppointmentDeleteSchema>) => {
	const user = await getCurrentUser();
	if (user?.role !== 'ADMIN') return { error: ACTION_ONLY_ADMIN_ERROR };

	const validatedData = AppointmentDeleteSchema.safeParse(values);
	if (!validatedData.success) return { error: ACTION_INVALID_PAYLOAD_ERROR };

	const { id } = validatedData.data;

	const existingAppointment = await getUniqueAppointment({
		where: { id },
		select: { id: true, Booking: { select: { id: true } } },
	});

	if (!existingAppointment) return { error: ACTION_APPOINTMENT_NOT_FOUND_ERROR };

	if (existingAppointment.Booking?.id !== undefined) return { error: ACTION_APPOINTMENT_DELETE_BOOKED_ERROR };

	await deleteUniqueAppointment({
		where: { id },
		select: { id: true },
	});

	return { success: ACTION_APPOINTMENT_DELETED_SUCCESS };
};
