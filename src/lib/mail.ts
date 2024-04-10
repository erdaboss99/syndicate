import { Resend } from 'resend';

import { env } from '@/env.mjs';
import { formatDate } from '@/lib/date';

import AppointmentHandlingTemplate, { AppointmentHandlingTemplateProps } from '@/emails/AppointmentHandling';
import EmailVerificationTemplate from '@/emails/EmailVerification';
import PasswordResetTemplate from '@/emails/PasswordReset';

const resend = new Resend(env.RESEND_API_KEY);

export const sendPasswordResetEmail = async (name: string, email: string, token: string) => {
	const resetLink = `${env.BASE_URL}/auth/reset-password?token=${token}`;
	const sender = env.EMAIL_FROM;
	const recipient = email;

	await resend.emails.send({
		from: sender,
		to: [recipient],
		subject: 'Syndicate - Reset your password',
		react: PasswordResetTemplate({ name: name, resetLink: resetLink }),
	});
};

export const sendVerificationEmail = async (name: string, email: string, token: string) => {
	const confirmationLink = `${env.BASE_URL}/auth/email-verification?token=${token}`;
	const sender = env.EMAIL_FROM;
	const recipient = email;

	await resend.emails.send({
		from: sender,
		to: [recipient],
		subject: 'Syndicate - Confirm your email address',
		react: EmailVerificationTemplate({ name: name, confirmationLink: confirmationLink }),
	});
};

export const sendAppointmentGenerationReport = async ({
	message,
	intervalStart,
	intervalEnd,
	workDaysInInterval,
	weekendDaysInInterval,
	createdAppointments,
}: AppointmentHandlingTemplateProps) => {
	const sender = env.EMAIL_FROM;
	const recipient = env.REPORT_RECIPIENT;
	const currentTime = formatDate(new Date(), 'yyyy-MM-dd');

	await resend.emails.send({
		from: sender,
		to: [recipient],
		subject: `Syndicate - Appointment generation report ${currentTime}`,
		react: AppointmentHandlingTemplate({
			message,
			intervalStart,
			intervalEnd,
			workDaysInInterval,
			weekendDaysInInterval,
			createdAppointments,
		}),
	});
};
