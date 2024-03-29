import { EMAIL_VERIFICATION_TOKEN_EXPIRY } from '@/constants';

import {
	Body,
	Container,
	Heading,
	Hr,
	Html,
	Img,
	Link,
	Preview,
	Section,
	Tailwind,
	Text,
} from '@react-email/components';

type EmailVerificationTemplateProps = {
	name: string;
	confirmationLink: string;
};

export const EmailVerificationTemplate = ({ name, confirmationLink }: EmailVerificationTemplateProps) => (
	<Html style={base}>
		<Tailwind>
			<Preview>Syndicate - Email verification</Preview>
			<Body className='bg-slate-100'>
				<Container className='mx-auto my-0 px-7 pb-12 pt-5'>
					<Img
						src='https://syndicate.erdelyiroland.com/syndicate.png'
						alt='Syndicate logo'
						width='518'
						height='66'
					/>
					<Heading className='mt-12 text-3xl font-bold'>Dear {name},</Heading>
					<Section className='mx-0 my-6'>
						<Text className='text-xl'>Please click on the link below to verify your email address!</Text>
						<Link
							className='my-4 text-xl'
							href={confirmationLink}>
							Verify email address
						</Link>
						<Text className='text-xl'>
							{`This link will expire in ${EMAIL_VERIFICATION_TOKEN_EXPIRY} minutes.`}
						</Text>
					</Section>
					<Text className='text-xl'>If you didn&apos;t request this, please ignore this email.</Text>
					<Text className='text-xl'>
						Best regards,
						<br />- Syndicate
					</Text>
					<Hr className='mt-12 border border-slate-300' />
					<Text className='ml-2 text-sm text-slate-400'>Syndicate - Corporate Management System</Text>
				</Container>
			</Body>
		</Tailwind>
	</Html>
);

export default EmailVerificationTemplate;

const base = {
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};
