import { hotelModel } from "@/models/hotel-model";
import { ratingModel } from "@/models/rating-model";
import { reviewModel } from "@/models/review-model";

export async function getAllHotels() {
    const hotels = await hotelModel.find();
    return hotels;
}

export async function getHotelById(hotelId) {
    const hotel = await hotelModel.findById(hotelId);
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