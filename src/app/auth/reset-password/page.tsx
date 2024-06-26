import { TokenVerificationSchema } from '@/schemas';

import ResetPasswordForm from '@/components/auth/ResetPasswordForm';
import { AuthWrapper } from '@/components/general/CardWrapper';
import ErrorCard from '@/components/general/ErrorCard';

type ResetPasswordPageProps = {
	params: { slug: string };
	searchParams: { [key: string]: string | string[] | undefined };
};

const ResetPasswordPage = ({ searchParams }: ResetPasswordPageProps) => {
	const validatedData = TokenVerificationSchema.safeParse(searchParams);
	if (!validatedData.success)
		return (
			<ErrorCard
				headerTitle='Authentication error!'
				message='Invalid token!'
				linkLabel='Back to login'
				linkHref='/auth/login'
			/>
		);

	return (
		<AuthWrapper
			navigationTree={null}
			headerTitle='Enter a new password'
			linkLabel='Back to login'
			linkHref='/auth/login'>
			<ResetPasswordForm token={validatedData.data.token} />
		</AuthWrapper>
	);
};

export default ResetPasswordPage;
