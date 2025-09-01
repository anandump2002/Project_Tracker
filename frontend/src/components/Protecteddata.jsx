// import React, { useState } from "react";
// import axios from "axios";
// import "./Protecteddata.css"; // Add styles here

// export const Protecteddata = ({ token }) => {
//   const [data, setData] = useState(null);

//   // const fetchData = async () => {
//   //   try {
//   //     const res = await axios.get("http://localhost:3000/protected/user-data", {
//   //       headers: { Authorization: `Bearer ${token}` },
//   //     });
//   //     setData(res.data);
//   //   } catch (err) {
//   //     setData({
//   //       error:
//   //         err.response?.data?.error || "An error occurred while fetching data",
//   //     });
//   //   }
//   // };

//   // Fetch logged-in user profile
// const fetchProfile = async () => {
//   try {
//     const res = await axios.get("http://localhost:3000/auth/me", {
//       headers: { Authorization: `Bearer ${token}` },
//     });
//     setData(res.data);
//   } catch (err) {
//     setData({ error:
//            err.response?.data?.error || "An error occurred while fetching data",
//        });
//      }
//   };



//   return (
//     <div className="dashboard">
//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="logo">PROJECT MANAGEMENT TOOL</div>
//         <ul>
//           <li> Dashboard</li>
//           <li> Assigned Tasks</li>
       
//         </ul>
       
//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
       

//         {/* Cards Section */}
//         <section className="cards">
          
         
//         </section>

//         {/* Recent Projects */}
//         <section className="recent">
//           <h2>Recent Projects</h2>
//           {/* <button onClick={fetchData} className="btn fetch">
//             Fetch Protected Data
//           </button> */}

//            <button onClick={fetchProfile} className="btn fetch">
//               Fetch My Profile
//             </button>

//           <pre>{JSON.stringify(data, null, 2)}</pre>
//         </section>
//       </main>
//     </div>
//   );
// };




// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./Protecteddata.css";

// export const Protecteddata = ({ token }) => {
//   const [tasks, setTasks] = useState([]);
//   const [error, setError] = useState("");

//   const handleLogout = () => {
//   localStorage.clear();
//   window.location.href = "/login";
// };

//   // Fetch tasks assigned to this user
//   const fetchMyTasks = async () => {
//     try {
//       const res = await axios.get("http://localhost:3000/tasks/my", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setTasks(res.data);
//     } catch (err) {
//       setError(err.response?.data?.error || "Error fetching tasks");
//     }
//   };

//   useEffect(() => {
//     fetchMyTasks();
//   }, []);

//   //  Update task status
//   const updateTaskStatus = async (taskId, newStatus) => {
//     try {
//       await axios.put(
//         `http://localhost:3000/tasks/my/${taskId}`,
//         { status: newStatus },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       fetchMyTasks(); // refresh after update
//     } catch (err) {
//       setError(err.response?.data?.error || "Error updating task status");
//     }
//   };

//   return (
//     <div className="dashboard">

//       {/* Sidebar */}
//       <aside className="sidebar">
//         <div className="logo">Project Tracker</div>
//         {/* <ul>
//           <li> Dashboard</li>
//           <li> My Tasks</li>
//         </ul> */}
//         <div className="greeting">
//           Welcome, {localStorage.getItem("username")} 
//         </div>

//         <button onClick={handleLogout} className="btn red">Logout</button>

//       </aside>

//       {/* Main Content */}
//       <main className="main-content">
//         <section className="cards">
//           <h2>Welcome to your Dashboard</h2>
//         </section>
       
//         {/* My Tasks */}
//         <section className="recent">
//           <h2>My Tasks</h2>
//           {error && <p className="error">{error}</p>}
//           {tasks.length === 0 ? (
//             <p>No tasks assigned yet.</p>
//           ) : (
//             tasks.map((task) => (
//               <div key={task._id} className={`task-card ${task.status}`}>
//                 <h3>{task.title}</h3>
//                 <p>{task.description}</p>
//                 <p>Project: {task.project?.name || "N/A"}</p>

//                 {/* Status Dropdown */}
//                 <label>Status: </label>
//                 <select
//                   value={task.status}
//                   onChange={(e) => updateTaskStatus(task._id, e.target.value)}
//                 >
//                   <option value="todo">To Do</option>
//                   <option value="in-progress">In Progress</option>
//                   <option value="done">Done</option>
//                 </select>
//               </div>
//             ))
//           )}
//         </section>
//       </main>
//     </div>
//   );
// };



import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Protecteddata.css";

export const Protecteddata = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState("");

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  // Fetch tasks assigned to this user
  const fetchMyTasks = async () => {
    try {
      const res = await axios.get("http://localhost:3000/tasks/my", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (err) {
      setError(err.response?.data?.error || "Error fetching tasks");
    }
  };

  useEffect(() => {
    fetchMyTasks();
  }, []);

  //  Update task status
  const updateTaskStatus = async (taskId, newStatus) => {
    try {
      await axios.put(
        `http://localhost:3000/tasks/my/${taskId}`,
        { status: newStatus },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchMyTasks(); // refresh after update
    } catch (err) {
      setError(err.response?.data?.error || "Error updating task status");
    }
  };

  // Priority colors
  const getPriorityClass = (priority) => {
    switch (priority) {
      case "high":
        return "priority-high";
      case "medium":
        return "priority-medium";
      case "low":
        return "priority-low";
      default:
        return "";
    }
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo">Project Tracker</div>
        <div className="greeting">
          Welcome, {localStorage.getItem("username")}
        </div>
        <button onClick={handleLogout} className="btn red">Logout</button>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <section className="cards">
          <h2>Welcome to your Dashboard</h2>
        </section>

        {/* My Tasks */}
        <section className="recent">
          <h2>My Tasks</h2>
          {error && <p className="error">{error}</p>}
          {tasks.length === 0 ? (
            <p>No tasks assigned yet.</p>
          ) : (
            tasks.map((task) => (
              <div key={task._id} className="task-card">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Project: {task.project?.name || "N/A"}</p>
                <p className={`priority ${getPriorityClass(task.priority)}`}>
                  Priority: {task.priority}
                </p>
                <p>
                  Due: {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No deadline"}
                </p>

                {/* Status Dropdown */}
                <label>Status: </label>
                <select
                  value={task.status}
                  onChange={(e) => updateTaskStatus(task._id, e.target.value)}
                >
                  <option value="todo">To Do</option>
                  <option value="in-progress">In Progress</option>
                  <option value="done">Done</option>
                </select>
              </div>
            ))
          )}
        </section>
      </main>
    </div>
  );
};
