import {registerChef,loginChef,getAllChefs,getChefById,deleteChef} from "../controllers/chef.controller.js";
import express from "express";

const router = express.Router();


router.post("/register", registerChef);
router.post("/login", loginChef);
router.get("/getAllChefs", getAllChefs);
router.get("/getChefById/:id", getChefById);
router.delete("/deleteChef/:id", deleteChef);
export default router;