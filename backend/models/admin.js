import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ["superadmin", "support"], default: "superadmin" },
},
{
  timestamps: true  
});

export default mongoose.model("admin", adminSchema);