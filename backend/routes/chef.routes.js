import express from "express";
import { registerChef, loginChef, getAllChefs, getChefById, deleteChef } from "../controllers/chef.controller.js";
import authorize from "../middlewares/Authmiddleware.js";

const router = express.Router();

router.post("/register", registerChef);
router.post("/login", loginChef);
router.get("/getAllChefs", authorize('admin'), getAllChefs);  // Only admin can fetch all chefs
router.get("/getChefById/:id", authorize('admin', 'chef'), getChefById);  // Admin or that Chef himself
router.delete("/deleteChef/:id", authorize('admin'), deleteChef);  // Only admin can delete

export default router;
