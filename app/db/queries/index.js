import { hotelModel } from "@/app/models/hotel-model";

export async function getAllHotels() {
    const hotels = await hotelModel.find();
    return hotels;
}