const express = require('express');
const authroutes = express.Router();
const User = require('../models/userSchema');
const responseHandler = require('../helperFunc/responseHandle');
const formatMongoError = require('../helperFunc/formantMongoErrors');
const { signupController, loginController } = require('../controllers/authController');

authroutes.get('/', (req, res) => {
    console.log('Auth route is working fine');
    responseHandler(res, 200, true, 'Auth route is working fine')
});

authroutes.post('/signup', signupController);

authroutes.post('/login', loginController);


module.exports = authroutes;
