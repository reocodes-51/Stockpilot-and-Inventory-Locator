const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTP = async (email, otp) => {
    console.log("EMAIL_USER:", process.env.EMAIL_USER);
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to: email,
    subject: "StockPilot OTP Verification",
    html: `
      <h2>Your OTP</h2>
      <h1>${otp}</h1>
      <p>This OTP is valid for 5 minutes.</p>
    `,
  });
};

module.exports = sendOTP;