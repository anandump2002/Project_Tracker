// const express =require('express');
// const router = express.Router();
// const {register , login } = require('../controllers/AuthControl');

// const User = require("../models/User");
// const authenticateJWT = require("../utility/Auth");
// const authorizeRoles = require("../middleware/roleMiddleware");

// router.post('/register', register);
// router.post('/login', login);
// router.get('/', (req, res) => {
//     res.send('This is a protected route'); 
// });

// router.get("/users", authenticateJWT, authorizeRoles("admin"), async (req, res) => {
//   try {
//     const users = await User.find({}, "username role"); // return only username + role
//     res.json(users);
//   } catch (err) {
//     res.status(500).json({ error: "Error fetching users" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const { register, login } = require("../controllers/AuthControl");
const User = require("../models/User");
const authenticateJWT = require("../utility/Auth");
const authorizeRoles = require("../middleware/roleMiddleware");

//  Register new user
router.post("/register", register);

//  Login
router.post("/login", login);

//  Get current logged-in user's profile
router.get("/me", authenticateJWT, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId, "username role");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Error fetching profile" });
  }
});

// Get all users (Admin only)
router.get("/users", authenticateJWT, authorizeRoles("admin"), async (req, res) => {
  try {
    const users = await User.find({}, "username role");
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: "Error fetching users" });
  }
});

//  Dummy test route
router.get("/", (req, res) => {
  res.send("Auth API is working");
});

module.exports = router;
