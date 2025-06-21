import mongoose from "mongoose";


export async function dbConnect() {
    try {
        const connection = await mongoose.connect(String(process.env.MONGODB_CONNECTION_URI));
        console.log("Connected to MongoDB");
        return connection;
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}