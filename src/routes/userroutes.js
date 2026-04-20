import express from 'express';
const userRoutes = express.Router();
import User from '../models/userSchema.js';
import responseHandler from '../helperFunc/responseHandle.js';
import formatMongoError from '../helperFunc/formantMongoErrors.js';
import { getAllUsersController, updateUserController, deleteUserController, getLoginedUserController } from '../controllers/usersController.js';

userRoutes.get('/health', (req, res) => {
    console.log('User route is working fine');
    responseHandler(res, 200, true, 'User route is working fine')
});

userRoutes.get('/all',getAllUsersController);

userRoutes.get('/', getLoginedUserController);

// userRoutes.post('/', getSpecificUserController);

userRoutes.put('/', updateUserController);

userRoutes.delete('/', deleteUserController);

export default userRoutes;