const User = require('../models/userSchema');
const responseHandler = require('../helperFunc/responseHandle');
const formatMongoError = require('../helperFunc/formantMongoErrors');


async function getAllUsersController(req, res) {
    try {
        const users = await User.find({});

        let withoutPasswordUsers = users.map(user => {
            let { _doc: data } = user;
            delete data.password;
            delete data.__v;
            console.log(data);
            return data;

        });

        console.log(withoutPasswordUsers);
        responseHandler(res, 200, true, 'Users retrieved successfully', withoutPasswordUsers);
    } catch (error) {
        responseHandler(res, 500, false, 'Failed to retrieve users');
        console.log(error);

    }
}

async function updateUserController(req, res) {
    let { id } = req.params;
    console.log(req.params);

    try {
        const updatedUser = await User.findOneAndUpdate(
            { _id: id },
            { $set: req.body },
            {
                returnDocument: "after",
                runValidators: true
            }
        );
        if (!Updateduser) {
            responseHandler(res, 200, true, 'User not found');
            return;
        }
    }
    catch (error) {
        responseHandler(res, 500, false, 'Failed to update user');
        console.log(error);
    }
}

async function deleteUserController(req, res) {

}

module.exports = {
    getAllUsersController,
    updateUserController,
    deleteUserController

}