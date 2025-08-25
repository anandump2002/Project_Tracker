const express = require('express');
const router = express.Router();
const authenticateJWT = require('../utility/Auth');
const authorizeRoles = require('../middleware/roleMiddleware');

//  Normal user route
router.get('/user-data', authenticateJWT, (req, res) => {
  res.json({ message: 'User dashboard', userId: req.user.userId });
});

//  Admin-only route
router.get('/admin-dashboard',
  authenticateJWT,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: 'Admin dashboard: manage tasks', userId: req.user.userId });
  }
);

module.exports = router;
