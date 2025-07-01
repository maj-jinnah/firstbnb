import { getHotelById } from "@/db/queries";
import { getDaysDifference } from "@/utilis";

const BookingCard =async ({hotelId, checkin, checkout, mode}) => {

    const hotel= await getHotelById(hotelId, checkin, checkout);
    const days = getDaysDifference(checkin, checkout);

    return (
        <div className={`${mode === 'past'? 'bg-[#ebf6e9]' : 'bg-[#F6F3E9]'} p-4 rounded-md`}>
            <div className="flex justify-between items-center ">
                <div>
                    <h3 className="text-xl font-semibold">
                        {hotel?.name}
                    </h3>
                    <div className="text-sm text-gray-600 my-4">
                        <p>Check In: {checkin}</p>
                        <p>Check Out: {checkout}</p>
                    </div>
                </div>

                <div>
                    <h3 className="text-xl font-semibold text-right">৳{hotel?.lowRate * days}</h3>
                    <p className="text-sm text-gray-600">
                        ৳{hotel?.lowRate} per night x {days} day(s)
                    </p>
                </div>
            </div>
        </div>
    );
};

export default BookingCard;
