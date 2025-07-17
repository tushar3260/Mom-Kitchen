import express from 'express';
import {
  createMeal,
  getAllMeals,
  getMealById,
  updateMeal,
  deleteMeal,
  getMealByChefId
} from '../controllers/meal.controller.js';

const router = express.Router();

router.post("/create", createMeal);
router.get("/", getAllMeals);
router.get("/:id", getMealById);
router.put("/:id", updateMeal);
router.delete("/:id", deleteMeal);
router.get("/chef/:chefId", getMealByChefId);
export default router;
