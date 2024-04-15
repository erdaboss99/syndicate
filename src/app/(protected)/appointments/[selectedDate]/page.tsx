import { getAppointmentsInInterval } from '@/data/appointment';
import { formatDate, getIntervalFromDay } from '@/lib/date';
import { AppointmentSelectQueryParamsSchema } from '@/schemas';

import AppointmentSelectButton from '@/components/appointments/AppointmentSelectButton';
import { CardWrapper } from '@/components/general/CardWrapper';
import ErrorCard from '@/components/general/ErrorCard';

const AppointmentSelectPage = async ({ params }: { params: { selectedDate: string } }) => {
	const { selectedDate } = params;
	const paramsData = AppointmentSelectQueryParamsSchema.safeParse(selectedDate);

	if (!paramsData.success)
		return (
			<ErrorCard
				headerTitle='Invalid data'
				message={paramsData.error.errors[0].message}
				linkLabel='Back to date selection'
				linkHref='/appointments'
			/>
		);

	const currentDate = new Date(paramsData.data);
	const formattedDate = formatDate(currentDate, 'WRITTEN_LONG_DATE');
	const interval = getIntervalFromDay(currentDate);

	const appointments = await getAppointmentsInInterval({ interval, status: 'AVAILABLE' });

	return (
		<CardWrapper
			navigationTree={[
				{ nodeLabel: 'Date selection', nodeHref: 'appointments' },
				{ nodeLabel: 'Appointment selection', nodeHref: paramsData.data },
			]}
			headerTitle='Appointment selection'
			headerLabel={formattedDate}
			size='MD'
			linkLabel='Back to date selection'
			linkHref='/appointments'>
			{appointments.length > 0 && (
				<div className='grid grid-cols-1 gap-4 md:grid-cols-3'>
					{appointments.map((appointment) => (
						<AppointmentSelectButton
							key={appointment.id}
							appointment={appointment}
						/>
					))}
				</div>
			)}
			{appointments.length <= 0 && (
				<p className='text-center text-sm md:text-base'>There are no available appointments for this day.</p>
			)}
		</CardWrapper>
	);
};

export default AppointmentSelectPage;
