import express from 'express';
import { UserLogin, UserSignUp, getallUsers } from '../controllers/user.controller.js';
import authorize from "../middlewares/Authmiddleware.js";

const router = express.Router();

router.post('/login', UserLogin);
router.post('/signup', UserSignUp);
router.get('/getallusers', authorize('admin'), getallUsers); // Only admin can view all users

export default router;
