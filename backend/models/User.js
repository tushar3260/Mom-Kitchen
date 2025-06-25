import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
  },
  phone: {
    type: String,
    required: true,
    match: /^[6-9]\d{9}$/
  },
  passwordHash: { type: String, required: true },
  address: {
    street: String,
    city: String,
    pincode: String
  },
  favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Chef" }],
  createdAt: { type: Date, default: Date.now }
},{
  timestamps: true  
});

export default mongoose.model("User", userSchema);