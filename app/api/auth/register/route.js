import { dbConnect } from "@/db/dbConnection";
import { userModel } from "@/models/user-model";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export const POST = async (request) => {
    const { fname, lname, email, password } = await request.json();

    await dbConnect();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        name: `${fname} ${lname}`,
        email,
        password: hashedPassword
    }

    try {
        const isUserExists = await userModel.findOne({ email });

        if (isUserExists) {
            return new NextResponse(JSON.stringify({ message: "User already exists." }), { status: 400 });
        }

        await userModel.create(newUser);
        return new NextResponse(JSON.stringify({ message: "Successfully created a new user." }), { status: 201 });
    } catch (error) {
        console.error("Error creating user:", error);
        return new NextResponse(JSON.stringify({ message: "Failed to create a new user." }), { status: 500 });
    }
};