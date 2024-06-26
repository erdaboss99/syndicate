import { redirect } from 'next/navigation';

import { UserRole } from '@prisma/client';

import { getUsers } from '@/data/user';
import { getCurrentUser } from '@/lib/auth';
import { DEFAULT_AUTHENTICATED_REDIRECT } from '@/routes';

import DataTable from '@/components/data-tables/DataTable';
import { UserColumns } from '@/components/data-tables/columns/UserColumns';
import { CardWrapper } from '@/components/general/CardWrapper';

const AdminManageUsersPage = async () => {
	const currentUser = await getCurrentUser();
	if (currentUser?.role !== 'ADMIN') redirect(DEFAULT_AUTHENTICATED_REDIRECT);

	const users = await getUsers({
		select: { id: true, name: true, email: true, role: true, emailVerified: true, image: true },
	});

	const filterOptions = Object.values(UserRole).map((role) => ({
		value: role,
		label: role[0].toUpperCase() + role.slice(1).toLowerCase(),
	}));

	return (
		<CardWrapper
			navigationTree={[
				{ nodeLabel: 'Dashboard', nodeHref: 'dashboard' },
				{ nodeLabel: 'Manage users', nodeHref: 'manage-users' },
			]}
			headerTitle='Manage users'
			size='XL'
			linkLabel='Back to the dashboard'
			linkHref='/dashboard'>
			<div className='mx-auto w-[95%]'>
				<DataTable
					columns={UserColumns}
					data={users}
					search='email'
					filter={{ title: 'Role', columnKey: 'role', options: filterOptions }}
					visibility
					pagination
				/>
			</div>
		</CardWrapper>
	);
};

export default AdminManageUsersPage;
