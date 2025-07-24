import express from "express";
import { upload } from "../middlewares/upload.js"; // ✅ Multer import
import {
  registerChef,
  loginChef,
  getAllChefs,
  getChefById,
  deleteChef,
  toggleApproval
} from "../controllers/chef.controller.js";
import authorize from "../middlewares/Authmiddleware.js";

const router = express.Router();

router.post("/register", upload.single("photo"), registerChef); // ✅ With image upload
router.post("/login", loginChef);
router.get("/getAllChefs", getAllChefs);
router.get("/getChefById/:id", authorize("admin", "chef"), getChefById);
router.delete("/deleteChef/:id", authorize("admin"), deleteChef);
router.put("/toggleApproval/:id", authorize("admin"), toggleApproval);

export default router;
