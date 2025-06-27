import { getRatingsByHotelId, getReviewsByHotelId } from "@/db/queries";

const HotelReviewAndRating = async ({ hotelId }) => {

    const reviews = await getReviewsByHotelId(hotelId);
    const ratings = await getRatingsByHotelId(hotelId);

    const getRatingDescription = (avgRating) => {
        if (avgRating === 0) {
            return "No Ratings Available";
        } else if (avgRating > 0 && avgRating <= 2) {
            return "Poor";
        } else if (avgRating > 2 && avgRating <= 3) {
            return "Average";
        } else if (avgRating > 3 && avgRating <= 4) {
            return "Good";
        } else if (avgRating > 4) {
            return "Very Good";
        }
    };

    let avgRating = 0;

    if (ratings.length === 1) {
        avgRating = ratings[0].rating;
    }
    if (ratings.length > 1) {
        avgRating =
            ratings.reduce((item, currentValue) => {
                return item.rating + currentValue.rating;
            }) / ratings.length;
    }

    return (
        <div className="flex gap-2 items-center my-2">
            <div className="bg-[#FF6A28] w-[35px] h-[40px] rounded-sm text-white grid place-items-center font-bold">
                {avgRating}
            </div>
            <div className="flex flex-col">
                <span className="font-bold">{getRatingDescription(avgRating)}</span>
                <span className="text-sm">{`${reviews.length} ${reviews.length > 1 ? "Reviews" : "Review"}`}</span>
            </div>
        </div>
    );
};

export default HotelReviewAndRating;
