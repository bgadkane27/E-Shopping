const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../../models/User");

//for register

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const user = await User.findOne({ username });
    const emailUser = await User.findOne({ email });

    if (user || emailUser) {
      return res.json({
        sucess: false,
        message:
          "username or email already exists. Try with a different username or email.",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(200).json({
      sucess: true,
      message: "Registration successful.",
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
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const checkUser = await User.findOne({ email });    
    if (!checkUser) {
      return res.json({
        sucess: false,
        message: "User does not exist. Please register first.",
      });
    }

    const checkPassword = await bcrypt.compare(password, checkUser.password);
    if (!checkPassword) {
      return res.json({
        sucess: false,
        message: "Incorrect password.",
      });
    }
    const token = jwt.sign(
      {
        id: checkUser._id,
        email: checkUser.email,
        role: checkUser.role
      },
      'CLIENT_SECRET_KEY', {expiresIn: "60m"}
    );

    res.cookie("token", token, {httpOnly: true, secure: false}).json({
      sucess: true,
      message: "Login successful.",
      user: {
        id: checkUser._id,
        email: checkUser.email,
        role: checkUser.role
      }
    })  
  } catch (e) {
    console.log(e);
    res.status(500).json({
      sucess: false,
      message: "Internal Server Error",
    });
  }
};

//for logout
const logoutUser = async (req, res) => {
  res.clearCookie("token").json({
    sucess: true,
    message: "Logout successful.",
  })
}

//for auth middleware
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      sucess: false,
      message: "Unauthorized.",
    });
  }

  try {
    const decoded = jwt.verify(token, 'CLIENT_SECRET_KEY');
    req.user = decoded;
    next();
  } catch (e) {
    console.log(e);
    res.status(401).json({
      sucess: false,
      message: "Unauthorized.",
    });
  }
}
module.exports = { registerUser, loginUser, logoutUser, authMiddleware };
