import Meal from "../models/Meal.js";
import Chef from "../models/Chef.js"; // 👈 To validate chefId

// ✅ Create Meal
export const createMeal = async (req, res) => {
  try {
    const {
      chefId,
      title,
      description,
      photo,
      tags,
      availableDays,
      timeSlots,
      price
    } = req.body;

    // ✅ Required field validation
    if (!chefId || !title || !description || !price || !availableDays || !timeSlots) {
      return res.status(400).json({
        message: "Missing required fields",
        required: ["chefId", "title", "description", "price", "availableDays", "timeSlots"]
      });
    }

    // ✅ Check if chef exists
    const chefExists = await Chef.findById(chefId);
    if (!chefExists) {
      return res.status(404).json({ message: "Invalid chefId: Chef not found" });
    }

    const newMeal = new Meal({
      chefId,
      title,
      description,
      photo,
      tags,
      availableDays,
      timeSlots,
      price
    });

    await newMeal.save();

    res.status(201).json({
      message: "Meal created successfully",
      meal: newMeal
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to create meal", error: err.message });
  }
};

// ✅ Get All Meals
export const getAllMeals = async (req, res) => {
  try {
    const meals = await Meal.find().populate("chefId", "name email cuisine");
    res.status(200).json(meals);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch meals", error: err.message });
  }
};

// ✅ Get Meal by ID
export const getMealById = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id).populate("chefId", "name email");
    if (!meal) {
      return res.status(404).json({ message: "Meal not found" });
    }
    res.status(200).json(meal);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch meal", error: err.message });
  }
};

// ✅ Update Meal
export const updateMeal = async (req, res) => {
  try {
    const updatedMeal = await Meal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    res.status(200).json({
      message: "Meal updated successfully",
      meal: updatedMeal
    });

  } catch (err) {
    res.status(500).json({ message: "Failed to update meal", error: err.message });
  }
};

// ✅ Delete Meal
export const deleteMeal = async (req, res) => {
  try {
    const deletedMeal = await Meal.findByIdAndDelete(req.params.id);
    if (!deletedMeal) {
      return res.status(404).json({ message: "Meal not found" });
    }

    res.status(200).json({ message: "Meal deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: "Failed to delete meal", error: err.message });
  }
};


export const getMealByChefId = async (req, res) => {
  try {
    const meals = await Meal.find({ chefId: req.params.chefId }).populate("chefId", "name email");
    if (meals.length === 0) {
      return res.status(404).json({ message: "No meals found for the given chefId" });
    }
    res.status(200).json({ meals });
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch meals", error: err.message });
  }
};

