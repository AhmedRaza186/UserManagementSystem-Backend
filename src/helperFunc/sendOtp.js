
const nodemailer = require('nodemailer');
const MY_EMAIL = process.env.MY_EMAIL;
const MY_EMAIL_PASSWORD = process.env.MY_EMAIL_PASSWORD;

const emailConfig = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  requireTLS: true,
  auth: {
    user: process.env.MY_EMAIL,
    pass: process.env.MY_EMAIL_PASSWORD
  },
  family: 4
};
async function sendEmailOTP(fullName, email, otp) {
    const transporter = nodemailer.createTransport(emailConfig);

    const mailOptions = {
        from: process.env.MY_EMAIL,
        to: email,
        subject: 'OTP Verification',
        html: `
        <div style="font-family: Arial, sans-serif; background:#f4f4f4; padding:40px;">
            <div style="max-width:520px; margin:auto; background:#ffffff; padding:30px; border-radius:12px; text-align:center; box-shadow:0 10px 25px rgba(0,0,0,0.1);">

                <h2 style="color:#333; margin-bottom:5px;">
                    Hey ${fullName || "there"} 👋
                </h2>

                <p style="color:#666; font-size:14px;">
                    Use this OTP to verify your account. It’s valid for <b>5 minutes</b>.
                </p>

                <div style="margin:25px 0;">
                    <span style="
                        display:inline-block;
                        font-size:30px;
                        letter-spacing:10px;
                        font-weight:bold;
                        background:#111827;
                        color:#fff;
                        padding:14px 28px;
                        border-radius:10px;
                    ">
                        ${otp}
                    </span>
                </div>

                <p style="color:#999; font-size:12px;">
                    If you didn’t request this, you can safely ignore this email.
                </p>

                <hr style="margin:20px 0; border:none; border-top:1px solid #eee;">

                <p style="font-size:12px; color:#aaa;">
                    © ${new Date().getFullYear()} Your App Name
                </p>

            </div>
        </div>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return `OTP sent to ${email} via email  ${process.env.MY_EMAIL}`;
    } catch (error) {
        throw `Error sending OTP to ${email} via email:  ${error}`;
    }
}

module.exports =  sendEmailOTP ;
