// import React, { useState } from "react";
// import axios from "axios";
// import "./AdminDashboard.css"; // separate CSS for admin dashboard

// export const AdminDashboard = ({ token }) => {
//   const [data, setData] = useState(null);

//   const fetchAdminData = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/protected/admin-dashboard", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setData(res.data);
//     } catch (err) {
//       setData({
//         error:
//           err.response?.data?.error || "An error occurred while fetching admin data",
//       });
//     }
//   };

//   return (
//     <div className="admin-dashboard">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="logo">ADMIN PANEL</div>
//         <ul>
//           <li> Dashboard</li>
//           <li> Manage Projects</li>
//           <li> Manage Users</li>
//           <li> Reports</li>
//         </ul>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">

//         {/* Action Buttons */}
//         <section className="cards">
//           <button className="btn purple">+ Create Project</button>
//           {/* <button className="btn yellow">+ Create Team</button>
//           <button className="btn red"> Manage Project</button>
//           <button className="btn red"> Manage Users</button> */}
//         </section>

//         {/* Admin Data */}
//         <section className="recent">
//           <h2>Admin Actions</h2>
//           <button onClick={fetchAdminData} className="btn fetch">
//             Fetch Admin Data
//           </button>
//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </section>
//       </main>
//     </div>
//   );
// };




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AdminDashboard.css";
// import { Link } from "react-router-dom";

// export const AdminDashboard = ({ token }) => {
//   const [projects, setProjects] = useState([]);
//   const [newProject, setNewProject] = useState({ name: "", description: "" });
//   const [editingProject, setEditingProject] = useState(null);

//   const handleLogout = () => {
//   localStorage.clear();
//   window.location.href = "/login";
// };

//   // Fetch all projects
//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/projects", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects(res.data);
//     } catch (err) {
//       console.error("Error fetching projects:", err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   // Create project
//   const handleCreate = async () => {
//     try {
//       await axios.post("http://localhost:3000/projects", newProject, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewProject({ name: "", description: "" });
//       fetchProjects();
//     } catch (err) {
//       console.error("Error creating project:", err.response?.data || err.message);
//     }
//   };

//   // Update project
//   const handleUpdate = async () => {
//     try {
//       await axios.put(
//         `http://localhost:3000/projects/${editingProject._id}`,
//         editingProject,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setEditingProject(null);
//       fetchProjects();
//     } catch (err) {
//       console.error("Error updating project:", err.response?.data || err.message);
//     }
//   };

//   // Delete project
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/projects/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchProjects();
//     } catch (err) {
//       console.error("Error deleting project:", err.response?.data || err.message);
//     }
//   };

//   return (
//     <div className="admin-dashboard">
    
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="logo">ADMIN PANEL</div>
//         {/* <ul>
//           <li> Dashboard</li>
//           <li> Manage Projects</li>
//           <li> Manage Users</li>
//           <li> Reports</li>
//         </ul> */}
        
//         <div className="greeting">
//           Welcome, {localStorage.getItem("username")} 
//         </div>

//         <button onClick={handleLogout} className="btn red">Logout</button>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         <h2>Project Management</h2>

//         {/* Create New Project */}
//         <div className="form-section">
//           <input
//             type="text"
//             placeholder="Project Name"
//             value={newProject.name}
//             onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={newProject.description}
//             onChange={(e) =>
//               setNewProject({ ...newProject, description: e.target.value })
//             }
//           />
//           <button className="btn purple" onClick={handleCreate}>
//             + Create Project
//           </button>
//         </div>

//         {/* Edit Project */}
//         {editingProject && (
//           <div className="form-section">
//             <input
//               type="text"
//               value={editingProject.name}
//               onChange={(e) =>
//                 setEditingProject({ ...editingProject, name: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               value={editingProject.description}
//               onChange={(e) =>
//                 setEditingProject({ ...editingProject, description: e.target.value })
//               }
//             />
//             <button className="btn yellow" onClick={handleUpdate}>
//                Update Project
//             </button>
//             <button className="btn red" onClick={() => setEditingProject(null)}>
//                Cancel
//             </button>
//           </div>
//         )}

//         {/* Projects List */}
//         <section className="recent">
//           <h2>All Projects</h2>
//           {projects.map((proj) => (
//               <div key={proj._id} className="project-card">
//                 <h3>{proj.name}</h3>
//                 <p>{proj.description}</p>

//                 <div className="actions">
//                   <Link to={`/admin-dashboard/project/${proj._id}`}>
//                     <button className="btn purple"> Open</button>
//                   </Link>
//                   <button className="btn yellow" onClick={() => setEditingProject(proj)}>
//                      Edit
//                   </button>
//                   <button className="btn red" onClick={() => handleDelete(proj._id)}>
//                      Delete
//                   </button>
//               </div>
//             </div>
//           ))}
//         </section>
//       </main>
//     </div>
//   );
// };




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./AdminDashboard.css";
// import { Link } from "react-router-dom";

// export const AdminDashboard = ({ token }) => {
//   const [projects, setProjects] = useState([]);
//   const [newProject, setNewProject] = useState({ name: "", description: "" });
//   const [editingProject, setEditingProject] = useState(null);

//   const handleLogout = () => {
//     localStorage.clear();
//     window.location.href = "/login";
//   };

//   // Fetch all projects
//   const fetchProjects = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/projects", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setProjects(res.data);
//     } catch (err) {
//       console.error("Error fetching projects:", err.response?.data || err.message);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   // Create project
//   const handleCreate = async () => {
//     try {
//       await axios.post("http://localhost:3000/projects", newProject, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setNewProject({ name: "", description: "" });
//       fetchProjects();
//     } catch (err) {
//       console.error("Error creating project:", err.response?.data || err.message);
//     }
//   };

//   // Update project
//   const handleUpdate = async () => {
//     try {
//       await axios.put(
//         `http://localhost:3000/projects/${editingProject._id}`,
//         editingProject,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setEditingProject(null);
//       fetchProjects();
//     } catch (err) {
//       console.error("Error updating project:", err.response?.data || err.message);
//     }
//   };

//   // Delete project
//   const handleDelete = async (id) => {
//     try {
//       await axios.delete(`http://localhost:3000/projects/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       fetchProjects();
//     } catch (err) {
//       console.error("Error deleting project:", err.response?.data || err.message);
//     }
//   };

//   return (
//     <div className="admin-dashboard">
    
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="logo">ADMIN PANEL</div>
        
//         <div className="greeting">
//           Welcome, {localStorage.getItem("username")} 
//         </div>

//         <button onClick={handleLogout} className="btn red">Logout</button>
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         <h2>Project Management</h2>

//         {/* Create New Project */}
//         <div className="form-section">
//           <input
//             type="text"
//             placeholder="Project Name"
//             value={newProject.name}
//             onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
//           />
//           <input
//             type="text"
//             placeholder="Description"
//             value={newProject.description}
//             onChange={(e) =>
//               setNewProject({ ...newProject, description: e.target.value })
//             }
//           />
//           <button className="btn purple" onClick={handleCreate}>
//             + Create Project
//           </button>
//         </div>

//         {/* Edit Project */}
//         {editingProject && (
//           <div className="form-section">
//             <input
//               type="text"
//               value={editingProject.name}
//               onChange={(e) =>
//                 setEditingProject({ ...editingProject, name: e.target.value })
//               }
//             />
//             <input
//               type="text"
//               value={editingProject.description}
//               onChange={(e) =>
//                 setEditingProject({ ...editingProject, description: e.target.value })
//               }
//             />
//             <button className="btn yellow" onClick={handleUpdate}>
//                Update Project
//             </button>
//             <button className="btn red" onClick={() => setEditingProject(null)}>
//                Cancel
//             </button>
//           </div>
//         )}

//         {/* Projects List */}
//         <section className="recent">
//           <h2>All Projects</h2>
//           {projects.map((proj) => (
//             <div key={proj._id} className="project-card">
//               <h3>{proj.name}</h3>
//               <p>{proj.description}</p>

//               {/* Progress Section */}
//               <p>
//                 Tasks: {proj.completedTasks}/{proj.totalTasks}
//               </p>
//               <div className="progress-bar">
//                 <div
//                   className="progress-fill"
//                   style={{ width: `${proj.progress}%` }}
//                 ></div>
//               </div>
//               <p>{proj.progress}% Completed</p>

//               <div className="actions">
//                 <Link to={`/admin-dashboard/project/${proj._id}`}>
//                   <button className="btn purple"> Open</button>
//                 </Link>
//                 <button className="btn yellow" onClick={() => setEditingProject(proj)}>
//                    Edit
//                 </button>
//                 <button className="btn red" onClick={() => handleDelete(proj._id)}>
//                    Delete
//                 </button>
//               </div>
//             </div>
//           ))}
//         </section>
//       </main>
//     </div>
//   );
// };



import React, { useState, useEffect } from "react";
import axios from "axios";
import "./AdminDashboard.css";
import { Link } from "react-router-dom";

export const AdminDashboard = ({ token }) => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [filter, setFilter] = useState("all");
  const [newProject, setNewProject] = useState({ name: "", description: "" });
  const [editingProject, setEditingProject] = useState(null);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // Fetch all projects
  const fetchProjects = async () => {
    try {
      const res = await axios.get("http://localhost:3000/projects", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
      setFilteredProjects(res.data); // set default
    } catch (err) {
      console.error("Error fetching projects:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  // Apply filter when filter value changes
  useEffect(() => {
    let filtered = projects;
    if (filter === "completed") {
      filtered = projects.filter((p) => p.progress === 100);
    } else if (filter === "in-progress") {
      filtered = projects.filter((p) => p.progress > 0 && p.progress < 100);
    } else if (filter === "not-started") {
      filtered = projects.filter((p) => p.progress === 0);
    }
    setFilteredProjects(filtered);
  }, [filter, projects]);

  // Create project
  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:3000/projects", newProject, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewProject({ name: "", description: "" });
      fetchProjects();
    } catch (err) {
      console.error("Error creating project:", err.response?.data || err.message);
    }
  };

  // Update project
  const handleUpdate = async () => {
    try {
      await axios.put(
        `http://localhost:3000/projects/${editingProject._id}`,
        editingProject,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setEditingProject(null);
      fetchProjects();
    } catch (err) {
      console.error("Error updating project:", err.response?.data || err.message);
    }
  };

  // Delete project
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProjects();
    } catch (err) {
      console.error("Error deleting project:", err.response?.data || err.message);
    }
  };

  return (
    <div className="admin-dashboard">
    
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">ADMIN PANEL</div>
        
        <div className="greeting">
          Welcome, {localStorage.getItem("username")} 
        </div>

        <button onClick={handleLogout} className="btn red">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <h2>Project Management</h2>

        {/* Filter Dropdown */}
        <div className="filter-bar">
          <label>Filter Projects: </label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="in-progress">In Progress</option>
            <option value="not-started">Not Started</option>
          </select>
        </div>

        {/* Create New Project */}
        <div className="form-section">
          <input
            type="text"
            placeholder="Project Name"
            value={newProject.name}
            onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="Description"
            value={newProject.description}
            onChange={(e) =>
              setNewProject({ ...newProject, description: e.target.value })
            }
          />
          <button className="btn purple" onClick={handleCreate}>
            + Create Project
          </button>
        </div>

        {/* Edit Project */}
        {editingProject && (
          <div className="form-section">
            <input
              type="text"
              value={editingProject.name}
              onChange={(e) =>
                setEditingProject({ ...editingProject, name: e.target.value })
              }
            />
            <input
              type="text"
              value={editingProject.description}
              onChange={(e) =>
                setEditingProject({ ...editingProject, description: e.target.value })
              }
            />
            <button className="btn yellow" onClick={handleUpdate}>
               Update Project
            </button>
            <button className="btn red" onClick={() => setEditingProject(null)}>
               Cancel
            </button>
          </div>
        )}

        {/* Projects List */}
        <section className="recent">
          <h2>All Projects</h2>
          {filteredProjects.map((proj) => (
            <div key={proj._id} className="project-card">
              <h3>{proj.name}</h3>
              <p>{proj.description}</p>

              {/* Progress Section */}
              <p>
                Tasks: {proj.completedTasks}/{proj.totalTasks}
              </p>
              <div className="progress-bar">
                <div
                  className="progress-fill"
                  style={{ width: `${proj.progress}%` }}
                ></div>
              </div>
              <p>{proj.progress}% Completed</p>

              <div className="actions">
                <Link to={`/admin-dashboard/project/${proj._id}`}>
                  <button className="btn purple"> Open</button>
                </Link>
                <button className="btn yellow" onClick={() => setEditingProject(proj)}>
                   Edit
                </button>
                <button className="btn red" onClick={() => handleDelete(proj._id)}>
                   Delete
                </button>
              </div>
            </div>
          ))}
        </section>
      </main>
    </div>
  );
};
