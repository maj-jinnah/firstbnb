import { dbConnect } from "@/db/dbConnection";
import { bookingModel } from "@/models/booking-model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export const POST = async (req, res) => {

    const { hotelId, userId, checkin, checkout } = await req.json();
    await dbConnect();
    const payload = {
        hotelId: new mongoose.Types.ObjectId(hotelId),
        userId: new mongoose.Types.ObjectId(userId),
        checkin,
        checkout
    };

    try {
        const payment = await bookingModel.create(payload);
        return new NextResponse(JSON.stringify({ message: "Congratulation, your payment is successful" }), { status: 201 });
    } catch (error) {
        console.error("Error creating payment:", error);
        return new NextResponse(JSON.stringify({ message: "Failed to create a new payment." }), { status: 500 });
    }
}