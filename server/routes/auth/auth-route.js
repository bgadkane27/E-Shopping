const express = require("express");
const { registerUser, loginUser, logoutUser, authMiddleware } = require("../../controller/auth/auth-controller");

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.get("/check-auth", authMiddleware);

module.exports = router;