import BookingCard from "./BookingCard";

const UpcomingBooking = ({ upcomingBookings }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">⌛️ Upcomming Bookings</h2>
            {upcomingBookings.length > 0 ? (
                upcomingBookings.map((bookings, index) => (
                    <BookingCard
                        key={index}
                        hotelId={bookings?.hotelId}
                        checkin={bookings?.checkin}
                        checkout={bookings?.checkout}
                        mode={`upcoming`}
                    />
                ))
            ) : (
                <p className="text-center text-sm">
                    No upcoming bookings found.
                </p>
            )}
        </div>
    );
};

export default UpcomingBooking;
