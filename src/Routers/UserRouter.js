import express from 'express';
import { GetAllUserController, Register } from '../Controllers/User.js';
const UserRouter=express.Router();
UserRouter.post('/register',Register);
UserRouter.get('/getall',GetAllUserController)
export default UserRouter;