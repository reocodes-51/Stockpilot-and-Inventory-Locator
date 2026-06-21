const express = require("express");

const router = express.Router();

const {
  sendOtp,
  verifyOtp,
} = require("../controllers/authController");

router.post("/send-otp", sendOtp);
router.post("/verify-otp", verifyOtp);

const {
  registerUser,
  loginUser
} = require(
  "../controllers/authController"
);

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

module.exports = router;