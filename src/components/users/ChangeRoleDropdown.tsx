'use client';

import { useRouter } from 'next/navigation';
import { useTransition } from 'react';

import { changeRole } from '@/actions/account';
import { UserRole } from '@prisma/client';
import { toast } from 'sonner';

import UserRoleBadge from '@/components/general/UserBadge';
import { DropdownMenuRadioGroup, DropdownMenuRadioItem } from '@/components/ui/DropdownMenu';

type ChangeRoleDropdownProps = {
	userId: string;
	userRole: UserRole;
};

const ChangeRoleDropdown = ({ userId, userRole }: ChangeRoleDropdownProps) => {
	const [isPending, startTransition] = useTransition();
	const roles = Object.values(UserRole);
	const router = useRouter();
	const onClick = (role: UserRole) => {
		startTransition(() => {
			changeRole({ role: role, id: userId }).then((data) => {
				if (data?.error) toast.error(data?.error);
				if (data?.success) {
					toast.success(data?.success);
					router.refresh();
				}
			});
		});
	};
	return (
		<DropdownMenuRadioGroup value={userRole}>
			{roles.map((role) => (
				<DropdownMenuRadioItem
					key={role}
					disabled={userRole === role || isPending}
					onClick={() => onClick(role)}
					value={role}>
					<UserRoleBadge
						role={role}
						badgeVariant='outline'
					/>
				</DropdownMenuRadioItem>
			))}
		</DropdownMenuRadioGroup>
	);
};

export default ChangeRoleDropdown;
