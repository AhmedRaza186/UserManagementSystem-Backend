import User from '../models/userSchema.js';
import responseHandler from '../helperFunc/responseHandle.js';
import formatMongoError from '../helperFunc/formantMongoErrors.js';
import jwt from 'jsonwebtoken';
import { response } from 'express';
const JWT_SECRET = process.env.JWT_SECRET;


async function getAllUsersController(req, res) {
    try {
        const { search, limit, sort } = req.query;


        let query = {};

        // 🔍 Search (by name or email)
        if (search) {
            query.$or = [
                { fullName: { $regex: search, $options: 'i' } },
                { email: { $regex: search, $options: 'i' } }
            ];
        }

        let mongoQuery = User.find(query);

        // 🔢 Limit
        if (limit) {
            mongoQuery = mongoQuery.limit(Number(limit));
        }

        // 🔃 Sorting
        if (sort) {
            if (sort === 'newest') mongoQuery = mongoQuery.sort({ createdAt: -1 });
            if (sort === 'oldest') mongoQuery = mongoQuery.sort({ createdAt: 1 });
            if (sort === 'age') mongoQuery = mongoQuery.sort({ age: 1 });
        }

        const users = await mongoQuery;

        // 🔐 Remove sensitive fields
        const cleanUsers = users.map(user => {
            const { password, __v, ...rest } = user._doc;
            return rest;
        });

        responseHandler(res, 200, true, 'Users retrieved successfully', cleanUsers);

    } catch (error) {
        console.log(error);
        responseHandler(res, 500, false, 'Failed to retrieve users');
    }
}

async function getLoginedUserController(req, res) {
    try {
    let token = req.headers.authorization;

        if (!token) {
            return responseHandler(res, 401, false, "No token provided");
        }

        const actualToken = token.split(" ")[1];

        let decodedToken;
        try {
            decodedToken = jwt.verify(actualToken, JWT_SECRET);
        } catch (err) {
            return responseHandler(res, 401, false, "Invalid token");
        }
        
        let user = await User.findOne({ _id: decodedToken._id });
        if (!user) {
            responseHandler(res, 200, true, 'User not found');
            return;
        }
        console.log(user._doc);

        responseHandler(res, 200, true, 'Logined user retrieved successfully', user,);
    }
    catch (error) {
        responseHandler(res, 500, false, 'Failed to retrieve user');
        console.log(error);

    }
}
async function updateUserController(req, res) {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return responseHandler(res, 401, false, "No token provided");
        }

        const actualToken = token.split(" ")[1];

        let decodedToken;
        try {
            decodedToken = jwt.verify(actualToken, JWT_SECRET);
        } catch (err) {
            return responseHandler(res, 401, false, "Invalid token");
        }

        const updatedUser = await User.findOneAndUpdate(
            { _id: decodedToken._id },
            { $set: req.body },
            {
                new: true,              // IMPORTANT: ensures updated document is returned
                runValidators: true
            }
        );

        if (!updatedUser) {
            return responseHandler(res, 404, false, "User not found");
        }

        return responseHandler(res, 200, true, "User updated successfully", updatedUser);

    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, false, "Failed to update user");
    }
}
async function deleteUserController(req, res) {
    try {
        let token = req.headers.authorization;

        if (!token) {
            return responseHandler(res, 401, false, "No token provided");
        }

        const actualToken = token.split(" ")[1];

        let decodedToken;
        try {
            decodedToken = jwt.verify(actualToken, JWT_SECRET);
        } catch (err) {
            return responseHandler(res, 401, false, "Invalid token");
        }

        const deletedUser = await User.findOneAndDelete({
            _id: decodedToken._id
        });

        if (!deletedUser) {
            return responseHandler(res, 404, false, "User not found");
        }

        return responseHandler(res, 200, true, "User deleted successfully");

    } catch (error) {
        console.log(error);
        return responseHandler(res, 500, false, "Failed to delete user");
    }
}

export {
    getAllUsersController,
    getLoginedUserController,
    updateUserController,
    deleteUserController

}