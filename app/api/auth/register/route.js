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
        await userModel.create(newUser);
        return new NextResponse(JSON.stringify({ message: "successfully created a new user." }), { status: 201 });
    } catch (error) {
        return new NextResponse(JSON.stringify({ message: "failed to create a new user." }), { status: 500 });
    }
};