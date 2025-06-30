import Link from "next/link";
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
                        <span className="bg-[#FF6A28] text-xs text-white px-2 py-1 rounded-md">
                            {" "}
                            Booked
                        </span>
                    )}
                    {/* <span className="bg-[#FF6A28] text-xs text-white px-1 py-1 rounded-md"> Booked</span> */}
                </h2>
                <p>📍 {hotel?.city}</p>
                <HotelReviewAndRating hotelId={hotel?._id} />
            </div>

            <div className="flex flex-col gap-2 items-end justify-center">
                <h2 className="text-2xl font-bold text-right underline decoration-1">
                    ৳{hotel?.lowRate}
                </h2>
                <p className=" text-right">Per Night for 1 Rooms</p>
                {fromListPage ? (
                    <Link
                        href={`/hotels/${hotel?._id}${params}`}
                        className="bg-[#FF6A28] px-8 py-2 rounded-md block text-white font-bold shadow-lg hover:shadow-primary/50 active:scale-95 transition-all"
                    >
                        Details
                    </Link>
                ) : (
                    <button
                        href={`/hotels/${hotel?._id}`}
                        disabled={hotel?.isBooked}
                        className="bg-[#FF6A28] px-8 py-2 rounded-md block text-white font-bold shadow-lg hover:shadow-primary/50 active:scale-95 transition-all disabled:bg-gray-500 disabled:text-gray-200 disabled:cursor-not-allowed"
                    >
                        {hotel?.isBooked ? "Already Booked" : "Book Now"}
                    </button>
                )}
            </div>
        </>
    );
};

export default HotelSummaryInfo;
