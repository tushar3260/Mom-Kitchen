
import express from 'express';
import userRouter from './routes/user.routes.js';
import cors from 'cors';
import { connect } from 'mongoose';
import adminRoutes from "./routes/admin.routes.js";
import chefRoutes from "./routes/chef.routes.js";
import mealRoutes from "./routes/meal.routes.js";
import reviewRoutes from "./routes/review.routes.js";
import orderRoutes from "./routes/order.routes.js";



import connectDB from './models/db.js';
import dotenv from 'dotenv';
dotenv.config();
const app = express();
app.use("/api/reviews", reviewRoutes);
app.use("/api/orders", orderRoutes);
//json parser for incoming requests
app.use(express.json());
//urlencoded parser for incoming requests
app.use(express.urlencoded({ extended: true }));
//cors for security purposes 
app.use(cors())
app.use('/api/user', userRouter);
app.use("/api/admins", adminRoutes);
app.use("/api/chefs", chefRoutes);
app.use("/api/meals", mealRoutes);
connectDB()
app.get('/', (req, res) => {
    res.send('Hello duniyaa');
});


export default app;

