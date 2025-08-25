import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { Protecteddata } from './components/Protecteddata';
import { AdminDashboard } from './components/AdminDashboard';  // new component
import './App.css';
import { ProjectTasks } from "./components/ProjectTasks";
import { Home } from './components/Home'; // new component


export default function App() {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const role = localStorage.getItem("role"); // get role
  // localStorage.setItem("username");
  
// const handleLogout = () => {
//   localStorage.clear();
//   setToken("");
//   window.location.href = "/login";
// };


  return (
    
    <Router>
       {/* {token && (
        <nav className="navbar">
          <span>Welcome, {localStorage.getItem("username")}</span>
          <button onClick={handleLogout} className="btn red">Logout</button>
        </nav>
      )} */}
      
      <Routes>
        {/* <Route path="/" element={<Navigate to="/login" />} /> */}
        <Route path="/" element={<Home />} /> 

        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
        <Route
            path="/user-dashboard"
            element={token && localStorage.getItem("role") === "user" ? (
              <Protecteddata token={token} />
            ) : (
              <Navigate to="/login" />
            )}
          />

        <Route
            path="/admin-dashboard"
            element={token && localStorage.getItem("role") === "admin" ? (
              <AdminDashboard token={token} />
            ) : (
              <Navigate to="/login" />
            )}
          />

        {/*  Admin Project → Task Management */}
        <Route
          path="/admin-dashboard/project/:projectId"
          element={
            token && role === "admin" ? (
              <ProjectTasks token={token} />
            ) : (
              <Navigate to="/login" />
               )
          }
        />
      </Routes>
    </Router>
  );
}
