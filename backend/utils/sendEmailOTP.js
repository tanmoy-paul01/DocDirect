// import nodemailer from 'nodemailer'

// export const sendEmailOTP = async (email, otp) => {
//     const transporter = nodemailer.createTransport({
//         service: 'gmail',
//         auth: {
//         user: process.env.EMAIL,
//         pass: process.env.EMAIL_PASSWORD,
//         },
//     })

//     const mailOptions = {
//         from: process.env.EMAIL_ID,
//         to: email,
//         subject: 'OTP for Signup in DocDirect',
//         html: `<h2>Your OTP is: <strong>${otp}</strong></h2>`,
//     }

//     await transporter.sendMail(mailOptions)
// }



import nodemailer from 'nodemailer'

const emailTemplate = (otp) => `
    <div style="background-color:#f3f4f6;padding:20px">
        <div style="max-width:500px;margin:auto;background:#fff;border:2px solid #05E0D5;border-radius:10px;padding:30px;text-align:center;font-family:Arial,sans-serif">
        <h2 style="font-size:20px;color:#1f2937;margin-bottom:10px">Your OTP Code</h2>
        <p style="font-size:14px;color:#374151">Dear User,</p>
        <p style="font-size:14px;color:#374151">Your Login OTP code is:</p>

        <div style="margin:20px auto;padding:15px 30px;background-color:#00BFBA;color:#fff;font-size:28px;font-weight:bold;border-radius:6px;letter-spacing:2px;display:inline-block">
            ${otp}
        </div>

        <p style="font-size:14px;color:#6b7280">
            Please use this OTP to complete your authentication process.
            This OTP is valid for the next <strong>10 minutes</strong>.
        </p>
        <p style="font-size:14px;color:#6b7280">
            If you did not request this OTP, please ignore this email.
        </p>

        <p style="margin-top:30px;font-size:14px;color:#374151">
            Best regards,<br>
            <strong>DocDirect</strong>
        </p>

        <div style="margin-top:30px;font-size:12px;color:#9ca3af;border-top:1px solid #e5e7eb;padding-top:10px">
            © 2025 DocDirect. All rights reserved.
        </div>
        </div>
    </div>
    `;

    export const sendEmailOTP = async (email, otp) => {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'OTP for Signup in DocDirect',
        html: emailTemplate(otp),
    };

    await transporter.sendMail(mailOptions);
};
