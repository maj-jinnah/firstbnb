import { bookingModel } from "@/models/booking-model";
import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";
import { userModel } from "@/models/user-model";
import { isDateInBetween } from "@/utilis";

export async function getAllHotels(destination, checkin, checkout, category, priceRange, rate) {

    const destinationRegex = new RegExp(destination, 'i')

    const hotelsByDestination = await hotelModel
        .find({ city: { $regex: destinationRegex } });

    let allHotels = hotelsByDestination;

    if (category) {
        const categoriesToMatch = category.split(',');
        allHotels = allHotels.filter(hotel => categoriesToMatch.includes(hotel.propertyCategory.toString()));
    }

    if(rate){
        allHotels = allHotels.sort((a, b) => {
            if (rate === "highToLow") {
                return b.lowRate - a.lowRate;
            } else if (rate === "lowToHigh") {
                return a.lowRate - b.lowRate;
            } else {
                return 0; // No sorting applied
            }
        });
    }

    const priceRanges =
        typeof priceRange === "string" ? priceRange.split(",") : priceRange;

    if (priceRanges && priceRanges.length > 0) {
        allHotels = allHotels.filter((hotel) => {
            const rate = hotel.lowRate;
            return priceRanges.some((range) => {
                switch (range) {
                    case "range1":
                        return rate >= 500 && rate <= 1000;
                    case "range2":
                        return rate > 1000 && rate <= 2000;
                    case "range3":
                        return rate > 2000 && rate <= 3000;
                    case "range4":
                        return rate > 3000 && rate <= 4000;
                    case "range5":
                        return rate > 4000 && rate <= 5000;
                    case "range6":
                        return rate > 5000;
                    default:
                        return false;
                }
            });
        });
    }

    if (checkin && checkout) {
        allHotels = await Promise.all(
            allHotels.map(async (hotel) => {
                const found = await findBooking(hotel._id, checkin, checkout);

                if (found) {
                    hotel['isBooked'] = true;
                } else {
                    hotel['isBooked'] = false;
                }

                return hotel;
            })
        )
    }

    return allHotels;
}

const findBooking = async (hotelId, checkin, checkout) => {
    const booking = await bookingModel.find({
        hotelId: hotelId.toString(),
    });

    const found = booking.find((match) => {
        return (
            isDateInBetween(checkin, match.checkin, match.checkout) ||
            isDateInBetween(checkout, match.checkin, match.checkout)
        );
    });

    // console.log('found---', found)

    return found;
};

export async function getHotelById(hotelId, checkin, checkout) {
    const hotel = await hotelModel.findById(hotelId);

    if (checkin && checkout) {

        const found = await findBooking(hotel._id, checkin, checkout);
        if (found) {
            hotel['isBooked'] = true
        } else {
            hotel['isBooked'] = false
        }
    }

    return hotel;
}

export async function getRatingsByHotelId(hotelId) {
    const rating = await ratingModel.find({ hotelId: hotelId });
    return rating;
}

export async function getReviewsByHotelId(hotelId) {
    const review = await reviewModel.find({ hotelId: hotelId });
    return review;
}

export async function getUserByEmail(email) {
    const user = await userModel.findOne({ email: email });
    return user;
}

export async function getAllBookingsByUser(userId) {
    const bookings = await bookingModel.find({ userId: userId });
    return bookings;
}