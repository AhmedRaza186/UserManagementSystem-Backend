const express = require('express');
const authroutes = express.Router();
const User = require('../models/userSchema');
const responseHandler = require('../helperFunc/responseHandle');
const formatMongoError = require('../helperFunc/formantMongoErrors');
const { signupController, loginController, verifyOtpController } = require('../controllers/authController');
const { verify } = require('jsonwebtoken');

authroutes.get('/health', (req, res) => {
    console.log('Auth route is working fine');
    responseHandler(res, 200, true, 'Auth route is working fine')
});

authroutes.post('/signup', signupController);

authroutes.post('/verify-otp', verifyOtpController);

authroutes.post('/login', loginController);


module.exports = authroutes;
