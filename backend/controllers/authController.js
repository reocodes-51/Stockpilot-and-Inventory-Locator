const User = require("../models/User");
const bcrypt = require("bcryptjs");


// REGISTER

const registerUser = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json(user);

  } catch (error) {
    res.status(500).json(error);
  }
};


// LOGIN

const loginUser = async (req, res) => {
  try {

    const { email, password } = req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "User not found"
      });
    }

    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      );

    if (!isMatch) {
      return res.status(400).json({
        message: "Wrong password"
      });
    }

    res.status(200).json({
      message: "Login Successful",
      user
    });

  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  registerUser,
  loginUser
};