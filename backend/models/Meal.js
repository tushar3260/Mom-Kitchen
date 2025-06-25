import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  chefId: { type: mongoose.Schema.Types.ObjectId, ref: "Chef", required: true },
  title: { type: String, required: true },
  description: String,
  photo: { type: String },
  tags: [String], // e.g., ["Veg", "Dinner", "South Indian"]
  availableDays: [String], // e.g., ["Monday", "Wednesday"]
  timeSlots: [String], // ["Lunch", "Dinner"]
  price: { type: Number, required: true },
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now }
},
{
  timestamps: true  
});

export default mongoose.model("Meal", mealSchema);