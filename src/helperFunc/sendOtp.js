const { Resend } = require('resend');

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendEmailOTP(fullName, email, otp) {
    try {
        await resend.emails.send({
            from: 'ahmedrazamun@gmail.com', // later replace with your verified domain email
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
        });

        return `OTP sent to ${email} successfully`;

    } catch (error) {
        throw `Error sending OTP to ${email}: ${error.message}`;
    }
}

module.exports = sendEmailOTP;