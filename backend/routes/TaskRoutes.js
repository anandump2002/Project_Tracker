const express = require("express");
const router = express.Router({ mergeParams: true });
const authenticateJWT = require("../utility/Auth");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
  getMyTasks,
  updateMyTaskStatus
} = require("../controllers/TaskController");

// All routes restricted to Admin
router.post("/", authenticateJWT, authorizeRoles("admin"), createTask);
router.get("/", authenticateJWT, authorizeRoles("admin"), getTasks);
router.put("/:taskId", authenticateJWT, authorizeRoles("admin"), updateTask);
router.delete("/:taskId", authenticateJWT, authorizeRoles("admin"), deleteTask);
// User can fetch their own tasks
router.get("/my", authenticateJWT, getMyTasks);
// User can update their own task
router.put("/my/:taskId", authenticateJWT, updateMyTaskStatus);


module.exports = router;
