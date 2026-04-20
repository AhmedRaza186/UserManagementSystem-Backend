import express from 'express';
const authroutes = express.Router();
import User from '../models/userSchema.js';
import responseHandler from '../helperFunc/responseHandle.js';
import formatMongoError from '../helperFunc/formantMongoErrors.js';
import { signupController, loginController, verifyOtpController } from '../controllers/authController.js';
import jsonwebtoken from 'jsonwebtoken';
const { verify } = jsonwebtoken;

authroutes.get('/health', (req, res) => {
    console.log('Auth route is working fine');
    responseHandler(res, 200, true, 'Auth route is working fine')
});

authroutes.post('/signup', signupController);

authroutes.post('/verify-otp', verifyOtpController);

authroutes.post('/login', loginController);


export default authroutes;

