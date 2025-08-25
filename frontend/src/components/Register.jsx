// import React, { useState } from 'react';
// import axios from 'axios';

// export const Register = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async () => {
//     try {
//       const res = await axios.post('http://localhost:3001/auth/register', {
//         username,
//         password
//       });
//       alert(res.data.message || 'Registration successful');
//     } catch (err) {
//       alert(err.response?.data?.error || 'An error occurred');
//     }
//   };

//   return (
//     <div>
//       <h2>Register</h2><br />
//       <input
//         type="text"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//         placeholder="Username"
//       /><br /><br />
//       <input
//         type="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       /><br /><br />
//       <button onClick={handleRegister}>Register</button>
//     </div>
//   );
// };

import React, { useState } from 'react';
import axios from 'axios';
import './Register.css';
import { useNavigate } from "react-router-dom";
import Img from "../assets/project.jpg";


export const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      const res = await axios.post('http://localhost:3000/auth/register', {
        username,
        password,
      });
      alert(res.data.message || 'Registration successful');
      navigate("/login"); //  send them to login page after success
    } catch (err) {
      alert(err.response?.data?.error || 'An error occurred');
    }
  };

  return (
    <div>
      
      {/* Top Navigation */}
      <header className="navbar">
        <div className="logo">Project Tracker</div>
        <nav>
           <a href="/">Home</a>
          <a href="/login">Login</a>
          <a href="/register" className="active">Register</a>
        </nav>
      </header>
      <img src={Img} alt="background" className="bg-image" />
      {/* Main Content */}
      <main className="register-page">
        <div className="register-box">
          <h2>Create Your Account</h2>
          <p className="subtitle">Join us and start exploring our features</p>

          <input
            type="text"
            className="register-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            className="register-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="register-button" onClick={handleRegister}>
            Register
          </button>
            <p style={{ marginTop: "15px", fontSize: "0.9rem" }}>
            Already have an account?{" "}
            <span
              style={{ color: "#2575fc", cursor: "pointer", fontWeight: "bold" }}
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
  
        </div>
      </main>

    </div>
  );
};



// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Register.css";


// export const Register = () => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("user"); // default user
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleRegister = async () => {
//     try {
//       await axios.post("http://localhost:3000/auth/register", {
//         username,
//         password,
//         role,
//       });

//       alert("Registration successful! Please login.");
//       navigate("/login");
//     } catch (err) {
//       setError(err.response?.data?.error || "Registration failed");
//     }
//   };

//   return (
//     <div className="register-container">
//       <h2>Register</h2>
//       <input
//         type="text"
//         placeholder="Username"
//         value={username}
//         onChange={(e) => setUsername(e.target.value)}
//       />
//       <input
//         type="password"
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       {/* Role dropdown - optional for admin creation */}
//       <select value={role} onChange={(e) => setRole(e.target.value)}>
//         <option value="user">User</option>
//         <option value="admin">Admin</option>
//       </select>

//       <button onClick={handleRegister}>Register</button>
//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// };
