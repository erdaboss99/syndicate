import { Heading, Link, Section, Text } from '@react-email/components';

import { EMAIL_VERIFICATION_TOKEN_EXPIRY } from '@/constants';

import BaseEmailTemplate from '@/emails/BaseEmail';

type EmailVerificationTemplateProps = {
	userName: string;
	emailVerificationLink: string;
};

export const EmailVerificationTemplate = ({ userName, emailVerificationLink }: EmailVerificationTemplateProps) => (
	<BaseEmailTemplate previewSuffix={'Email verification'}>
		<Heading className='mt-12 text-3xl font-bold'>Dear {userName},</Heading>

		<Section className='mx-0 my-6'>
			<Text className='text-xl'>Please click on the link below to verify your email address!</Text>
			<Link
				className='my-4 text-xl'
				href={emailVerificationLink}>
				Verify email address
			</Link>
			<Text className='text-xl'>{`This link will expire in ${EMAIL_VERIFICATION_TOKEN_EXPIRY} minutes.`}</Text>
		</Section>

		<Text className='text-xl'>If you didn&apos;t request this, please ignore this email.</Text>
	</BaseEmailTemplate>
);

export default EmailVerificationTemplate;
