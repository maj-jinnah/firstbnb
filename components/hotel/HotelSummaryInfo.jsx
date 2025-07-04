import Link from "next/link";
import BookNowButton from "./BookNowButton";
import HotelReviewAndRating from "./HotelReviewAndRating";

const HotelSummaryInfo = ({ hotel, fromListPage, checkin, checkout }) => {
    let params = "";

    if (checkin && checkout) {
        params = `?checkin=${checkin}&checkout=${checkout}`;
    }

    return (
        <>
            <div
                className={
                    fromListPage
                        ? "flex-1"
                        : "flex-1 max-w-7xl mx-auto w-full px-4"
                }
            >
                <h2
                    className={
                        fromListPage
                            ? "font-bold text-lg"
                            : "font-bold text-2xl"
                    }
                >
                    {hotel?.name}{" "}
                    {Array.from({ length: hotel?.propertyCategory }).map(
                        (_, index) => (
                            <span
                                key={index}
                                style={{
                                    color: "orange",
                                    fontSize: "20px",
                                    top: "-6px",
                                    position: "relative",
                                }}
                            >
                                ★
                            </span>
                        )
                    )}
                    {hotel?.isBooked && (
                        <span className="bg-red-500 text-xs text-white px-2 py-1 ml-5 rounded-md">
                            {" "}
                            Already Booked
                        </span>
                    )}
                </h2>
                {/* {hotel?.isBooked && (
                    <span className="bg-red-500 text-xs text-white font-bold px-2 py-1 rounded-md">
                        {" "}
                        Already Booked
                    </span>
                )} */}
                <p>📍 {hotel?.city}</p>
                <HotelReviewAndRating hotelId={hotel?._id} />
            </div>

            <div className="flex flex-col gap-2 items-end justify-center">
                <h2 className="text-2xl font-bold text-right underline decoration-1">
                    ৳{hotel?.lowRate}
                </h2>
                <p className=" text-right">Per Night for 1 apartment</p>
                {fromListPage ? (
                    <Link
                        href={`/hotels/${hotel?._id}${params}`}
                        className="bg-[#FF6A28] px-8 py-2 rounded-md block text-white font-bold shadow-lg hover:shadow-primary/50 active:scale-95 transition-all"
                    >
                        Details
                    </Link>
                ) : hotel?.isBooked ? (
                    <span className="bg-gray-500 px-8 py-2 rounded-md block text-gray-200 font-bold shadow-lg cursor-not-allowed">
                        Already Booked
                    </span>
                ) : (
                    // <Link
                    //     href={`/hotels/${hotel?._id}/payment${params}`}
                    //     className="bg-[#FF6A28] px-8 py-2 rounded-md block text-white font-bold shadow-lg hover:shadow-primary/50 active:scale-95 transition-all"
                    // >
                    //     Book Now
                    // </Link>

                    <BookNowButton
                        hotelId={hotel._id.toString()}
                        checkin={checkin}
                        checkout={checkout}
                        params={params}
                    />
                )}
            </div>
        </>
    );
};

export default HotelSummaryInfo;
