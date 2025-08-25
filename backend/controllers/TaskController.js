const Task = require("../models/Task");

// Create Task under a project
exports.createTask = async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const task = await Task.create({
      title,
      description,
      project: req.params.projectId,
      assignedTo
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(400).json({ error: "Error creating task", details: err.message });
  }
};

// Get all tasks of a project
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ project: req.params.projectId }).populate("assignedTo", "username");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching tasks" });
  }
};

// Update task
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.taskId, req.body, { new: true });
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(400).json({ error: "Error updating task" });
  }
};

// Delete task
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.taskId);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Error deleting task" });
  }
};

// Get tasks assigned to current logged-in user
exports.getMyTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ assignedTo: req.user.userId })
      .populate("project", "name description");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: "Error fetching user tasks" });
  }
};

//  User can update their own task status
exports.updateMyTaskStatus = async (req, res) => {
  try {
    const task = await Task.findOne({
      _id: req.params.taskId,
      assignedTo: req.user.userId, // ensure user owns this task
    });

    if (!task) {
      return res.status(404).json({ error: "Task not found or not assigned to you" });
    }

    task.status = req.body.status || task.status;
    await task.save();

    res.json({ message: "Task status updated", task });
  } catch (err) {
    res.status(500).json({ error: "Error updating task status" });
  }
};

