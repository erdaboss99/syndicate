'use client';

import { useState, useTransition } from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

import { newVerification } from '@/actions/new-verification';

import { VerificationSchema } from '@/schemas';

import CardWrapper from '@/components/general/CardWrapper';
import FormError from '@/components/general/FormError';
import FormSuccess from '@/components/general/FormSuccess';
import { Button } from '@/components/ui/Button';
import { Form, FormControl, FormField, FormItem } from '@/components/ui/Form';
import { Input } from '@/components/ui/Input';
import { LuLoader2 } from 'react-icons/lu';

type NewVerificationFormProps = {
	token: string;
};

const NewVerificationForm = ({ token }: NewVerificationFormProps) => {
	const [isPending, startTransition] = useTransition();
	const [isError, setIsError] = useState('');
	const [isSuccess, setIsSuccess] = useState('');
	const [isDone, setIsDone] = useState(false);

	const verificationForm = useForm<z.infer<typeof VerificationSchema>>({
		resolver: zodResolver(VerificationSchema),
		defaultValues: {
			token: token,
		},
	});

	const onSubmit = (values: z.infer<typeof VerificationSchema>) => {
		startTransition(() => {
			newVerification(values).then((data) => {
				verificationForm.reset();
				setIsDone(true);
				if (data?.error) setIsError(data?.error);
				if (data?.success) setIsSuccess(data?.success);
			});
		});
	};

	return (
		<CardWrapper
			headerTitle='Confirming your email'
			backButtonLabel='Back to login'
			backButtonHref='/auth/login'
			backButtonVariant='link'
			backButtonSize='lg'>
			<Form {...verificationForm}>
				<form
					className='space-y-6'
					onSubmit={verificationForm.handleSubmit(onSubmit)}>
					<FormField
						control={verificationForm.control}
						name='token'
						render={({ field }) => (
							<FormItem>
								<FormControl>
									<Input
										{...field}
										type='hidden'
										disabled={isPending}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<FormError message={isError} />
					<FormSuccess message={isSuccess} />
					<Button
						type='submit'
						size='lg'
						onClick={() => {
							setIsSuccess('');
							setIsError('');
						}}
						className='w-full'
						disabled={isPending || isDone}>
						{isPending ? (
							<span className='flex flex-row items-center gap-2'>
								<LuLoader2 className='animate-spin' />
								Processing...
							</span>
						) : (
							'Verify email address'
						)}
					</Button>
				</form>
			</Form>
		</CardWrapper>
	);
};

export default NewVerificationForm;