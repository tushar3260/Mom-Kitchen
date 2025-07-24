import mongoose from "mongoose";

const chefSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, "Invalid email format"]
  },
  password: { type: String, required: true }, // 👈 signupChef me passwordHash -> hash kiya jata hai isme
  phone: {
    type: String,
    required: true,
    match: [/^[6-9]\d{9}$/, "Invalid Indian phone number"]
  },
  bio: { type: String },
  cuisine: [{ type: String }], // 👈 Array of cuisines from req.body
  photo: { type: String }, // 👈 Single profile photo path
  kitchenImages: [{ type: String }], // 👈 Multiple image paths (array)
  documents: {
    aadhaar: { type: String },
    pan: { type: String }
  },
  bankDetails: {
    accNo: { type: String },
    ifsc: { type: String },
    holderName: { type: String }
  },
  location: {
    area: { type: String },
    lat: { type: String },
    lng: { type: String }
  },
  isApproved: { type: Boolean, default: false }, // 👈 For admin approval flow
  isVerified: { type: Boolean, default: false },
  isOtpVerified: { type: Boolean, default: false },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },
  createdAt: { type: Date, default: Date.now },
  role: { type: String, default: "chef" },
  rating: { type: Number, default: 0 }
});

export default mongoose.model("Chef", chefSchema);
