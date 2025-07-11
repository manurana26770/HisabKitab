const express = require("express");
const UserController = require("../controllers/userController");
const { verifyToken  } = require("../utils/auth");
const router = express.Router();

// Register User & Get Token
router.post("/register" , UserController.registerUser);

// Login User & Get Token
router.post("/login", UserController.loginUser);    

// Get User Details (Protected)
router.get("/:userId", verifyToken, UserController.getUserDetails);

// Update User (Protected)
router.put("/:userId", verifyToken, UserController.updateUser);

module.exports = router;
