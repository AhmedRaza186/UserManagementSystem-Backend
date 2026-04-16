const mongoose = require('mongoose');


const UserSchema = new mongoose.Schema({
    fullName: {
        type: String,
        minlength: [3, 'Name must be at least 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email'],
        unique: true
    },
    age: {
        type: Number,
        required: [true, 'Age is required'],
        min: [13, 'You must be at least 13 years old']
    },
    password: {
        type: String,
        minlength: [8, 'Password must be at least 8 characters']
    },
    profilePic: {
        type: String,
        default: null
    },
    phone:{
        type:Number,
    },
    otp: {
        type: Number,
    },
    otpExpiry: {
        type: Date,
    },
    isVerified: {
        type: Boolean,
        default: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

const User = mongoose.model('Users', UserSchema, 'Users')
module.exports = User;