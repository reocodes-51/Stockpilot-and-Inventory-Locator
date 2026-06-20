const User = require("../models/User");
const bcrypt = require("bcryptjs");

// REGISTER

const registerUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      role,
    } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,

      // NEW
      role: role || "worker",
    });

    res.status(201).json({
      message: "User Registered",
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

// LOGIN

const loginUser = async (req, res) => {
  try {
    const { email, password } =
      req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }

    if (!user.currentStreak) {
      user.currentStreak = 1;
    }

    if (!user.longestStreak) {
      user.longestStreak = 1;
    }

    if (!user.lastLoginDate) {
      user.lastLoginDate =
        new Date();
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password",
      });
    }

    const today = new Date();

    const lastLogin = new Date(
      user.lastLoginDate
    );

    const todayDate = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate()
    );

    const lastLoginDate = new Date(
      lastLogin.getFullYear(),
      lastLogin.getMonth(),
      lastLogin.getDate()
    );

    const diffDays = Math.floor(
      (todayDate - lastLoginDate) /
        (1000 * 60 * 60 * 24)
    );

    if (diffDays === 1) {
      user.currentStreak += 1;
    } else if (diffDays > 1) {
      user.currentStreak = 1;
    }

    if (
      user.currentStreak >
      user.longestStreak
    ) {
      user.longestStreak =
        user.currentStreak;
    }

    user.lastLoginDate =
      new Date();

    await user.save();

    res.status(200).json({
      message:
        "Login Successful",

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        currentStreak:
          user.currentStreak,
        longestStreak:
          user.longestStreak,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
};