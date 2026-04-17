const User = require('../models/userSchema');
const responseHandler = require('../helperFunc/responseHandle');
const formatMongoError = require('../helperFunc/formantMongoErrors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sendEmailOTP = require('../helperFunc/sendOtp');

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

const saltRounds = 12;

// token generator
const tokenGen = (user) => {
    return jwt.sign({
        _id: user._id,
        fullName: user.fullName,
        email: user.email
    }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};


/* =========================
   SIGNUP (send OTP)
========================= */
/* =========================
   SIGNUP (send OTP)
========================= */
async function signupController(req, res) {
    try {
        const { fullName, email, age, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return responseHandler(res, 400, false, 'Email already registered');
        }

        const hash = await bcrypt.hash(password, saltRounds);
        const otp = Math.floor(100000 + Math.random() * 900000);
        const otpExpiry = Date.now() + 5 * 60 * 1000;

        // 1. Create and Save User FIRST
        const user = new User({
            fullName,
            email,
            age,
            password: hash,
            otp,
            otpExpiry,
            isVerified: false
        });
        await user.save();

        // 2. Send Response to Frontend immediately
        responseHandler(res, 201, true, `OTP sent to email ${email}. Verify to complete signup`);

        // 3. Trigger Email without 'await' so it doesn't block the response
        await sendEmailOTP(fullName, email, otp).catch(err => {
            console.error("Background Email Error:", err);
        });

    } catch (error) {
        let formattedError = formatMongoError(error);
        responseHandler(res, 400, false, formattedError);
    }
}


/* =========================
   VERIFY OTP
========================= */
async function verifyOtpController(req, res) {
    try {
        const { email, otp } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            return responseHandler(res, 404, false, 'User not found');
        }

        if (user.isVerified) {
            return responseHandler(res, 200, true, 'User already verified');
        }

        if (user.otp !== Number(otp)) {
            return responseHandler(res, 400, false, 'Invalid OTP');
        }

        if (Date.now() > user.otpExpiry) {
            return responseHandler(res, 400, false, 'OTP expired');
        }

        user.isVerified = true;
        user.otp = null;
        user.otpExpiry = null;

        await user.save();

        responseHandler(res, 200, true, 'Account verified successfully');

    } catch (error) {
        responseHandler(res, 500, false, 'OTP verification failed');
    }
}


/* =========================
   LOGIN
========================= */
async function loginController(req, res) {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return responseHandler(res, 404, false, 'Email is not registered');
        }


        if (!user.isVerified) {

            const otp = Math.floor(100000 + Math.random() * 900000);
            const otpExpiry = Date.now() + 5 * 60 * 1000;

            user.otp = otp;
            user.otpExpiry = otpExpiry;
            await user.save();

            await sendEmailOTP(user.fullName, email, otp);
            return responseHandler(res, 401, false, 'Please verify your email first');

        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);

        if (!isPasswordMatch) {
            return responseHandler(res, 401, false, 'Incorrect password');
        }

        const { password: _, __v, otp, otpExpiry, ...safeUser } = user._doc;

        const token = `Bearer ${tokenGen(safeUser)}`;
        console.log(token);
        

        responseHandler(res, 200, true, 'Login successful', safeUser, token);

    } catch (error) {
        responseHandler(res, 500, false, 'Login failed Please try again!');
    }
}


/* =========================
   EXPORTS
========================= */
module.exports = {
    signupController,
    loginController,
    verifyOtpController
};