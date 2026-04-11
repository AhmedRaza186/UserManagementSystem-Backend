const User = require('../models/userSchema');
const responseHandler = require('../helperFunc/responseHandle');
const formatMongoError = require('../helperFunc/formantMongoErrors');

async function signupController(req, res) {

    console.log(req.body);

    try {
        const { fullName, email, age, password } = req.body;
        const user = new User({
            fullName: fullName,
            email: email,
            age: age,
            password: password
            // Date: new Date()

        })
        await user.save();

        responseHandler(res, 201, true, 'User created successfully', { fullName, email, age });
    } catch (error) {
        let formattedError = formatMongoError(error);
        responseHandler(res, 400, false, formattedError);
        console.log(formattedError);
    }
}

async function loginController(req, res) {
        const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email});
        if (!user) {
            responseHandler(res, 200, true, 'Email is not registered');
            return;
        } 
        if(user.password != password){
            responseHandler(res, 200, true, 'Incorrect password');
            return;
        
        }
        console.log(user);
        
        let { password: _,__v, ...userWithoutPassword } = user._doc;
        responseHandler(res, 200, true, 'Login successful', userWithoutPassword);
    }
        catch(error) {
            responseHandler(res, 500, false, 'Login failed Please try again!');
            console.log(error);
        }
    }

    module.exports = {
        signupController,
        loginController
    }