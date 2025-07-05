import mongoose, { Schema } from "mongoose";

const amenitySchema = new Schema({
  name: {
    required: true,
    type: String,
  },
  price: {
    type: Number,
    default: 0,
  },
  instructions: {
    required: true,
    type: String,
  },
  hours: {
    required: true,
    type: String,
  },
});

export const amenityModel =
  mongoose.models.amenities ?? mongoose.model("amenities", amenitySchema);