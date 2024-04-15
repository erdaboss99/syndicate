import BookingCard, { type BookingCardProps } from '@/components/bookings/BookingCard';
import { CardHeader } from '@/components/ui/Card';
import { Carousel, CarouselContent, CarouselDots, CarouselItem } from '@/components/ui/Carousel';

type BookingCarouselProps = {
	bookings: BookingCardProps[];
};

const BookingCarousel = ({ bookings }: BookingCarouselProps) => {
	if (bookings.length === 0) return null;
	return (
		<>
			<CardHeader variant='secondary'>User&apos;s existing bookings</CardHeader>
			<Carousel
				dotsPosition='bottom'
				opts={{
					align: 'start',
				}}
				className='mx-auto mb-5 w-full pb-5'>
				<CarouselContent>
					{bookings.map((booking) => (
						<CarouselItem key={booking.id}>
							<div className='space-y-4'>
								<BookingCard
									id={booking.id}
									description={booking.description}
									Issue={booking.Issue}
									Appointment={booking.Appointment}
								/>
							</div>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselDots gap='lg' />
			</Carousel>
		</>
	);
};

export default BookingCarousel;
