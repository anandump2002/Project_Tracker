const express = require("express");
const router = express.Router();
const authenticateJWT = require("../utility/Auth");
const authorizeRoles = require("../middleware/roleMiddleware");
const {
  createProject,
  getProjects,
  updateProject,
  deleteProject
} = require("../controllers/ProjectController");

// All project routes require admin
router.post("/", authenticateJWT, authorizeRoles("admin"), createProject);
router.get("/", authenticateJWT, authorizeRoles("admin"), getProjects);
router.put("/:id", authenticateJWT, authorizeRoles("admin"), updateProject);
router.delete("/:id", authenticateJWT, authorizeRoles("admin"), deleteProject);

module.exports = router;
