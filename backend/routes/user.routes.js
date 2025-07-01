import {UserLogin,UserSignUp,getallUsers} from '../controllers/user.controller.js';
import express from 'express';
const Router = express.Router();


Router.post('/login', UserLogin);
Router.post('/signup', UserSignUp);
Router.get('/getallusers', getallUsers);

export default Router;





 