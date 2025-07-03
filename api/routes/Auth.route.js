import express from 'express';
import { GoogleLogin, Login, Logout, Register } from '../controllers/Auth.controller.js';
import { authenticate } from '../middleware/Authenticate.js';


const AuthRouter = express.Router();

AuthRouter.post('/register',Register)
AuthRouter.post('/login',Login)
AuthRouter.post('/google-login',GoogleLogin)
AuthRouter.get('/logout', authenticate, Logout)


export default AuthRouter;

