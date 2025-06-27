import { auth } from "@/auth";
import ProfileInfo from "@/components/user/ProfileInfo";
import PastBooking from "@/components/user/booking/PastBooking";
import UpcomingBooking from "@/components/user/booking/UpcomingBooking";
import { redirect } from "next/navigation";

const BookingsPage = async () => {
    
    const session = await auth();

    if(!session){
        redirect('/login');
    }

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
                        <PastBooking />
                        <UpcomingBooking />
                    </div>
                </div>
            </section>
        </>
    );
};

export default BookingsPage;