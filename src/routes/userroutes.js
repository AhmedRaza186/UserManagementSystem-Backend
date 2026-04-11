const express = require('express');
const userRoutes = express.Router();
const User = require('../models/userSchema');
const responseHandler = require('../helperFunc/responseHandle');
const formatMongoError = require('../helperFunc/formantMongoErrors');

userRoutes.get('/', (req, res) => {
    console.log('User route is working fine');
    responseHandler(res, 200, true, 'User route is working fine')
});

userRoutes.get('/all',async(req,res)=>{
    try {
        const users = await User.find({});
       
      let withoutPasswordUsers =  users.map(user => {
            let {_doc:data} = user;
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
});

module.exports = userRoutes;