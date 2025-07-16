
import express from 'express';
import userRouter from './routes/user.routes.js';
import cors from 'cors';
import { connect } from 'mongoose';
import adminRoutes from "./routes/admin.routes.js";
import chefRoutes from "./routes/chef.routes.js";
import mealRoutes from "./routes/meal.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import orderRoutes from "./routes/order.routes.js";
import subscriptionRoutes from "./routes/subscription.routes.js";
import witthdrawlRoutes from "./routes/withdrawl.routes.js";
import AuthMiddleware from './middlewares/Authmiddleware.js';
import otpRoutes from './routes/otp.routes.js';
import connectDB from './models/db.js';
import dotenv from 'dotenv';
import forgotRoutes from './routes/forgot.routes.js';
dotenv.config();
const app = express();

//json parser for incoming requests
app.use(express.json());
//urlencoded parser for incoming requests
app.use(express.urlencoded({ extended: true }));
//cors for security purposes 
app.use(cors({
  origin: 'http://localhost:5173', // allow only your frontend dev URL
  credentials: true               // allow cookies, headers etc.
}));



app.use('/api/user', userRouter);
app.use("/api/admins", adminRoutes);
app.use("/api/chefs", chefRoutes);
app.use("/api/meals", mealRoutes);
app.use("/api/subscriptions", subscriptionRoutes);
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/withdrawls", witthdrawlRoutes);
app.use('/api/otp', otpRoutes); // OTP routes
app.use('/api/forgot', forgotRoutes); // Forgot password routes

connectDB()
app.get('/', (req, res) => {
    res.send('Hello duniyaa');
});



export default app;

