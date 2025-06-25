
import express from 'express';
import userRouter from './routes/user.routes.js';
import dotenv from 'dotenv';
import cors from 'cors';
import { connect } from 'mongoose';
dotenv.config();
const app = express();
import connectDB from './models/db.js';
//json parser for incoming requests
app.use(express.json());
//urlencoded parser for incoming requests
app.use(express.urlencoded({ extended: true }));
//cors for security purposes 
app.use(cors())
app.use('/api/user', userRouter);

connectDB()
app.get('/', (req, res) => {
    res.send('Hello duniyaa');
});


export default app;

//localhost/api/user/login