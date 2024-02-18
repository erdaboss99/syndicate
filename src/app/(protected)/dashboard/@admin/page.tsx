import DashboardWrapper from '@/components/dashboard/DashboardWrapper';
import DataTable from '@/components/data-tables/DataTable';
import { UserColumns } from '@/components/data-tables/columns/UserColumns';
import { userRoles } from '@/components/data-tables/filters';
import { database } from '@/lib/database';

const AdminDashboardPage = async () => {
	const users = await database.user.findMany();

	return (
		<DashboardWrapper headerTitle='Admin dashbord'>
			<div className='mx-auto w-[95%]'>
				<DataTable
					columns={UserColumns}
					data={users}
					search='email'
					filter={{ title: 'Role', columnKey: 'role', options: userRoles }}
					visibility
					pagination
				/>
			</div>
		</DashboardWrapper>
	);
};

export default AdminDashboardPage;
