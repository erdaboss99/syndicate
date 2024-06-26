import { getCurrentUser } from '@/lib/auth';

import AccountDeleteForm from '@/components/account/AccountDeleteForm';
import AccountDetails from '@/components/account/AccountDetails';
import AccountEditForm from '@/components/account/AccountEditForm';
import { CardWrapper } from '@/components/general/CardWrapper';
import { FormInfo } from '@/components/general/FormStatus';
import { Button, ButtonProps } from '@/components/ui/Button';
import { CardContent, CardFooter } from '@/components/ui/Card';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/Dialog';

const AccountPage = async () => {
	const user = await getCurrentUser();

	const isOAuth = user?.provider !== 'Credentials';
	return (
		<CardWrapper
			navigationTree={[{ nodeLabel: 'Account', nodeHref: 'account' }]}
			headerTitle='Account information'
			size='SM'>
			<CardContent className='space-y-4'>
				<AccountDetails
					image={user?.image!}
					name={user?.name!}
					email={user?.email!}
					role={user?.role!}
					provider={user?.provider!}
					createdAt={user?.createdAt!}
				/>
			</CardContent>
			<CardFooter className='flex flex-col items-center justify-center space-y-4'>
				{!isOAuth && (
					<AccountDialog
						title='Edit account'
						description="Make changes to your account here. Click save when you're done."
						triggerButtonLabel='Edit account information'
						triggerButtonVariant='default'>
						<AccountEditForm />
					</AccountDialog>
				)}
				<FormInfo
					message={
						isOAuth ? 'User data cannot be changed in accounts created using a third-party provider!' : ''
					}
				/>
				<AccountDialog
					title='Delete account'
					description='This action is irreversible. All data will be lost. Are you sure you want to delete your account?'
					triggerButtonLabel='Delete account'
					triggerButtonVariant='outline'>
					<AccountDeleteForm />
				</AccountDialog>
			</CardFooter>
		</CardWrapper>
	);
};

type AccountDialogProps = {
	title: string;
	description: string;
	triggerButtonLabel: string;
	triggerButtonVariant: ButtonProps['variant'];
	children: React.ReactNode;
};

const AccountDialog = ({
	title,
	description,
	triggerButtonLabel,
	triggerButtonVariant,
	children,
}: AccountDialogProps) => {
	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button
					variant={triggerButtonVariant}
					size='full'>
					{triggerButtonLabel}
				</Button>
			</DialogTrigger>
			<DialogContent className='sm:max-w-[425px]'>
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				{children}
			</DialogContent>
		</Dialog>
	);
};

export default AccountPage;
