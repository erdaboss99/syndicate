import AppointmentWrapper from '@/components/appointments/AppointmentWrapper';
import DateSelectionForm from '@/components/appointments/DateSelectionForm';

const AppointmentsPage = async () => {
	return (
		<AppointmentWrapper
			navigationTree={[{ nodeLabel: 'Date selection', nodeHref: 'appointments' }]}
			headerTitle='Date selection'
			size='md'>
			<DateSelectionForm />
		</AppointmentWrapper>
	);
};

export default AppointmentsPage;
