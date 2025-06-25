import mongoose from "mongoose";

const chefSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/
  },
  passwordHash: { type: String, required: true },
  bio: { type: String },
  cuisine: [String], // e.g., ["North Indian", "Jain"]
  isVerified: { type: Boolean, default: false },
  kitchenImages: [String],
  documents: {
    aadhaar: String,
    pan: String
  },
  bankDetails: {
    accNo: String,
    ifsc: String,
    holderName: String
  },
  location: {
    area: String,
    lat: Number,
    lng: Number
  },
  rating: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
},{
  timestamps: true  
});

export default mongoose.model("Chef", chefSchema);