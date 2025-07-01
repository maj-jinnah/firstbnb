import { auth } from "@/auth";
import ProfileInfo from "@/components/user/ProfileInfo";
import PastBooking from "@/components/user/booking/PastBooking";
import UpcomingBooking from "@/components/user/booking/UpcomingBooking";
import { getAllBookingsByUser, getUserByEmail } from "@/db/queries";
import { redirect } from "next/navigation";

const BookingsPage = async () => {

    const session = await auth();
    if (!session) {
        redirect('/login');
    }

    const loggedInUser = await getUserByEmail(session?.user?.email);
    const bookings = await getAllBookingsByUser(loggedInUser?._id);

    const pastBookings = bookings.filter(booking => new Date(booking.checkin) < new Date());
    const upcomingBookings = bookings.filter(booking => new Date(booking.checkin) > new Date());

    return (
        <>
            <section className="mt-[100px]">
                <div className="max-w-7xl mx-auto w-full px-4">
                    <ProfileInfo />
                </div>
            </section>
            <section>
                <div className="max-w-7xl mx-auto w-full px-4">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <PastBooking
                            pastBookings={pastBookings} />
                        <UpcomingBooking
                            upcomingBookings={upcomingBookings} />
                    </div>
                </div>
            </section>
        </>
    );
};

export default BookingsPage;