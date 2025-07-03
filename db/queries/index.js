import { bookingModel } from "@/models/booking-model";
import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";
import { userModel } from "@/models/user-model";
import { isDateInBetween } from "@/utilis";

export async function getAllHotels(destination, checkin, checkout, category) {

    const destinationRegex = new RegExp(destination, 'i')

    const hotelsByDestination = await hotelModel
        .find({ city: { $regex: destinationRegex } });

    let allHotels = hotelsByDestination;

    if (category) {
        const categoriesToMatch = category.split(',');
        allHotels = allHotels.filter(hotel => categoriesToMatch.includes(hotel.propertyCategory.toString()));
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