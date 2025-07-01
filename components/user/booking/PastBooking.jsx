import BookingCard from "./BookingCard";

const PastBooking = ({ pastBookings }) => {
    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold">🕛️ Past Bookings</h2>

            {pastBookings.length > 0 ? (
                pastBookings.map((booking, index) => (
                    <BookingCard
                        key={index}
                        hotelId={booking?.hotelId}
                        checkin={booking?.checkin}
                        checkout={booking?.checkout}
                        mode={"past"}
                    />
                ))
            ) : (
                <p className="text-center text-sm">No past bookings found.</p>
            )}
        </div>
    );
};

export default PastBooking;
