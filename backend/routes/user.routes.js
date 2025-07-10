import express from 'express';
import { UserLogin, UserSignUp, getallUsers } from '../controllers/user.controller.js';
import authorize from "../middlewares/Authmiddleware.js";

const router = express.Router();

router.post('/login', UserLogin);
router.post('/signup', UserSignUp);
router.get('/getallusers', authorize('admin'), getallUsers); // Only admin can view all users
// In routes/userRoutes.js

import { addUserAddress, getUserAddresses } from "../controllers/addlocation.controller.js";

router.post("/:id/address", addUserAddress); // PUT for adding new address
router.get("/:id/address", getUserAddresses); // GET for fetching user addresses

export default router;
//685bf2b806817869a865d3ad