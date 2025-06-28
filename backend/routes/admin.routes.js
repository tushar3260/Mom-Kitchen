
import express from "express";
import { registerAdmin, loginAdmin, getAllAdmins } from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/", getAllAdmins); // (optional, add auth middleware)

export default router;
