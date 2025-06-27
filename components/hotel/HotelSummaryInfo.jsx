import Link from "next/link";
import HotelReviewAndRating from "./HotelReviewAndRating";

const HotelSummaryInfo = ({ hotel, fromListPage }) => {

    // console.log(hotel)
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
                    <Link href={`/hotels/${hotel?._id}`} className="bg-[#FF6A28] px-8 py-2 rounded-md block text-white font-bold shadow-lg hover:shadow-primary/50 active:scale-95 transition-all">
                        Details
                    </Link>
                ) : (
                    <Link href={`/hotels/${hotel?._id}`} className="bg-[#FF6A28] px-8 py-2 rounded-md block text-white font-bold shadow-lg hover:shadow-primary/50 active:scale-95 transition-all ">
                        Book
                    </Link>
                )}
            </div>
        </>
    );
};

export default HotelSummaryInfo;
