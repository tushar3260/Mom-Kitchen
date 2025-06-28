import mongoose from "mongoose";

const chefSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"]
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"]
  },
  phone: {
    type: String,
    required: [true, "Phone number is required"],
    match: [/^[6-9]\d{9}$/, "Invalid Indian phone number"]
  },
  passwordHash: {
    type: String,
    required: [true, "Password hash is required"]
  },
  bio: {
    type: String,
    default: ""
  },
  cuisine: {
    type: [String],
    required: [true, "Cuisine is required"]
  },
  kitchenImages: {
    type: [String],
    required: [true, "At least one kitchen image is required"]
  },
  documents: {
    aadhaar: { type: String, required: [true, "Aadhaar is required"] },
    pan: { type: String, required: [true, "PAN is required"] }
  },
  bankDetails: {
    accNo: { type: String, required: [true, "Account number is required"] },
    ifsc: { type: String, required: [true, "IFSC code is required"] },
    holderName: { type: String, required: [true, "Account holder name is required"] }
  },
  location: {
    area: { type: String, required: [true, "Area is required"] },
    lat: { type: Number, required: [true, "Latitude is required"] },
    lng: { type: Number, required: [true, "Longitude is required"] }
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model("Chef", chefSchema);



