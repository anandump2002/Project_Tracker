const Project = require("../models/Project");
const Task = require("../models/Task");
// Create Project
exports.createProject = async (req, res) => {
  try {
    const project = await Project.create({
      name: req.body.name,
      description: req.body.description,
      createdBy: req.user.userId
    });
    res.status(201).json(project);
  } catch (err) {
    res.status(400).json({ error: "Error creating project", details: err.message });
  }
};

// Get all projects (with progress)
exports.getProjects = async (req, res) => {
  try {
    const projects = await Project.find();

    // For each project, calculate progress
    const projectsWithProgress = await Promise.all(
      projects.map(async (project) => {
        const totalTasks = await Task.countDocuments({ project: project._id });
        const completedTasks = await Task.countDocuments({
          project: project._id,
          status: "done",
        });

        let progress = 0;
        if (totalTasks > 0) {
          progress = Math.round((completedTasks / totalTasks) * 100);
        }

        return {
          ...project.toObject(),
          totalTasks,
          completedTasks,
          progress,
        };
      })
    );

    res.json(projectsWithProgress);
  } catch (err) {
    res.status(500).json({ error: "Error fetching projects" });
  }
};

// Update Project
exports.updateProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(400).json({ error: "Error updating project" });
  }
};

// Delete Project
exports.deleteProject = async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ error: "Project not found" });
    res.json({ message: "Project deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting project" });
  }
};
