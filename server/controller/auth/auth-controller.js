const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//for register

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      sucess: true,
      message: "Registered sucessfully",
    });

  } catch (e) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
    });
  }
};
//for login
const login = async (req, res) => {
  
    try {
    } catch (e) {
      console.log(e);
      res.status(500).json({
        sucess: false,
        message: "Internal Server Error",
      });
    }
  };

//for logout
//for auth middleware

module.exports = { registerUser };