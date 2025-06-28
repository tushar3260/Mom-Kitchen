import {UserLogin,UserSignUp} from '../controllers/user.controller.js';
import express from 'express';
const Router = express.Router();


Router.post('/login', UserLogin);
Router.post('/signup', UserSignUp);

export default Router;





 