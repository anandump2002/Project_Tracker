import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./ProjectTasks.css";

export const ProjectTasks = ({ token }) => {
  const { projectId } = useParams(); // get projectId from URL
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "", assignedTo: "" });
  const [users, setUsers] = useState([]);
  const [editingTask, setEditingTask] = useState(null);


  // Fetch tasks
  const fetchTasks = async () => {
    try {
      const res = await axios.get(`http://localhost:3000/projects/${projectId}/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error("Error fetching tasks:", err.response?.data || err.message);
    }
  };

  // Fetch users (so admin can assign tasks)
  const fetchUsers = async () => {
    try {
      const res = await axios.get("http://localhost:3000/auth/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(res.data);
    } catch (err) {
      console.error("Error fetching users:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchUsers();
  }, []);

  // Create Task
  const handleCreate = async () => {
    try {
      await axios.post(
        `http://localhost:3000/projects/${projectId}/tasks`,
        newTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTask({ title: "", description: "", assignedTo: "" });
      fetchTasks();
    } catch (err) {
      console.error("Error creating task:", err.response?.data || err.message);
    }
  };

  // Update Task
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/projects/${projectId}/tasks/${editingTask._id}`,
        editingTask,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error("Error updating task:", err.response?.data || err.message);
    }
  };

  // Delete Task
  const handleDelete = async (taskId) => {
    try {
      await axios.delete(
        `http://localhost:3000/projects/${projectId}/tasks/${taskId}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchTasks();
    } catch (err) {
      console.error("Error deleting task:", err.response?.data || err.message);
    }
  };

  return (
    <div className="task-dashboard">
         
      <h2>Tasks for Project</h2>

      {/* Create Task Form */}
      <div className="form-section">
        <input
          type="text"
          placeholder="Task Title"
          value={newTask.title}
          onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newTask.description}
          onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
        />
        <select
          value={newTask.assignedTo}
          onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
        >
          <option value="">Assign to User</option>
          {users.map((u) => (
            <option key={u._id} value={u._id}>
              {u.username}
            </option>
          ))}
        </select>
        <button className="btn purple" onClick={handleCreate}>
          + Add Task
        </button>
      </div>

      {/* Edit Task Form */}
      {editingTask && (
        <div className="form-section">
          <input
            type="text"
            value={editingTask.title}
            onChange={(e) =>
              setEditingTask({ ...editingTask, title: e.target.value })
            }
          />
          <input
            type="text"
            value={editingTask.description}
            onChange={(e) =>
              setEditingTask({ ...editingTask, description: e.target.value })
            }
          />
          <select
            value={editingTask.assignedTo || ""}
            onChange={(e) =>
              setEditingTask({ ...editingTask, assignedTo: e.target.value })
            }
          >
            <option value="">Assign to User</option>
            {users.map((u) => (
              <option key={u._id} value={u._id}>
                {u.username}
              </option>
            ))}
          </select>
          <button className="btn yellow" onClick={handleUpdate}>
             Update Task
          </button>
          <button className="btn red" onClick={() => setEditingTask(null)}>
             Cancel
          </button>
        </div>
      )}

      {/* Task List */}
      <section className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className="task-card">
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
            <p>Assigned To: {task.assignedTo?.username || "Unassigned"}</p>
            <div className="actions">
              <button className="btn yellow" onClick={() => setEditingTask(task)}>
                 Edit
              </button>
              <button className="btn red" onClick={() => handleDelete(task._id)}>
                 Delete
              </button>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};
