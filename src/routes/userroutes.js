const express = require('express');
const userRoutes = express.Router();
const User = require('../models/userSchema');
const responseHandler = require('../helperFunc/responseHandle');
const formatMongoError = require('../helperFunc/formantMongoErrors');
const { getAllUsersController, updateUserController, deleteUserController } = require('../controllers/usersController');

userRoutes.get('/', (req, res) => {
    console.log('User route is working fine');
    responseHandler(res, 200, true, 'User route is working fine')
});

userRoutes.get('/all',getAllUsersController);

userRoutes.put('/', updateUserController);

userRoutes.delete('/', deleteUserController);

module.exports = userRoutes;