import {
	ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_DISABLED_INFO,
	ACTION_ONLY_ADMIN_ERROR,
	ACTION_ONLY_AUTHENTICATED_ERROR,
} from '@/constants';
import { getAutoBookingDeletionStatus, getExpiredBookings } from '@/data/booking';
import { type ExpiredBookingDeletionTemplateProps } from '@/emails/ExpiredBookingDeletion';
import { getCurrentUser } from '@/lib/auth';
import { database } from '@/lib/database';
import { formatDatesInObject } from '@/lib/date';
import { sendExpiredBookingDeletionReport } from '@/lib/mail';

export async function DELETE() {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return new Response(JSON.stringify({ message: ACTION_ONLY_AUTHENTICATED_ERROR }), {
			status: 401,
		});
	}

	if (currentUser.role !== 'ADMIN')
		return new Response(JSON.stringify({ message: ACTION_ONLY_ADMIN_ERROR }), {
			status: 403,
		});

	const autoExpiredBookingDeletion = await getAutoBookingDeletionStatus();

	if (Boolean(autoExpiredBookingDeletion)) {
		const expiredBookings = await getExpiredBookings();

		const deletedBookings = [];
		for (const booking of expiredBookings) {
			deletedBookings.push(
				await database.booking.delete({
					where: {
						id: booking.id,
					},
					select: {
						description: true,
						User: {
							select: {
								name: true,
								email: true,
							},
						},
						Appointment: {
							select: {
								startTime: true,
							},
						},
						Issue: {
							select: {
								name: true,
							},
						},
					},
				}),
			);
		}
		const deletedExpiredBookings = deletedBookings.map((booking) => {
			return {
				userName: booking.User.name!,
				userEmail: booking.User.email!,
				appointmentStartTime: booking.Appointment.startTime,
				bookingDescription: booking.description,
				issueName: booking.Issue.name,
			};
		});

		const reportEmailParams: ExpiredBookingDeletionTemplateProps = {
			message: `${deletedBookings.length} bookings were deleted due to expiration.`,
			deletedExpiredBookings,
		};
		await sendExpiredBookingDeletionReport(reportEmailParams);

		return new Response(JSON.stringify(formatDatesInObject(reportEmailParams)), {
			status: 201,
		});
	}
	return new Response(
		JSON.stringify({
			message: ACTION_AUTO_EXPIRED_APPOINTMENT_DELETION_DISABLED_INFO,
		}),
		{ status: 200 },
	);
}