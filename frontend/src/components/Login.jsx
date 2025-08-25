// import React, { useState } from 'react';
// import axios from 'axios';

// export const Login = ({ setToken }) => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('http://localhost:3001/auth/login', {
//         username,
//         password
//       });
//       if (res.data.token) setToken(res.data.token);
//       alert(res.data.message || 'Login successful');
//     } catch (err) {
//       alert(err.response?.data?.error || 'An error occurred');
//     }
//   };

//   return (
//     <div>
//       <h2>Login</h2><br />
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
//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// };



// import React, { useState } from 'react';
// import axios from 'axios';
// import './Login.css'; // Same style base as register

// export const Login = ({ setToken }) => {
  
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post('http://localhost:3000/auth/login', {
//         username,
//         password
//       });
//       if (res.data.token) setToken(res.data.token);
//       alert(res.data.message || 'Login successful');
//     } catch (err) {
//       alert(err.response?.data?.error || 'An error occurred');
//     }
//   };

//   return (
//     <div>
//       {/* Navbar */}
//       <header className="navbar">
//         <div className="logo">MyWebsite</div>
//         <nav>
//           <a href="/">Home</a>
//           <a href="/login" className="active">Login</a>
//           <a href="/register">Register</a>
//         </nav>
//       </header>

//       {/* Main Login Form */}
//       <main className="login-page">
//         <div className="login-box">
//           <h2>Welcome Back</h2>
//           <p className="subtitle">Log in to access your account</p>

//           <input
//             type="text"
//             className="login-input"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             placeholder="Username"
//           />
//           <input
//             type="password"
//             className="login-input"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             placeholder="Password"
//           />
//           <button className="login-button" onClick={handleLogin}>
//             Login
//           </button>
//         </div>
//       </main>

   
//     </div>
//   );
// };


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css"; // Same style base as register
import Img from "../assets/project.jpg";


export const Login = ({ setToken }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        username,
        password,
      });

      if (res.data.token) {
        // Save token in localStorage + state
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("role", res.data.role);
        localStorage.setItem("username", res.data.username);
        setToken(res.data.token);

        // alert(res.data.message || "Login successful ");

       
        // Redirect to protected page after login
      
      if (res.data.role === "admin") {
          navigate("/admin-dashboard");
        } else {
          navigate("/user-dashboard");
        }
      }
    } catch (err) {
      alert(err.response?.data?.error || "An error occurred ");
    }
  };

  return (
    <div>
      {/* Navbar */}
      <header className="navbar">
        <div className="logo">Project Tracker</div>
        <nav>
          <a href="/">Home</a>
          <a href="/login" className="active">
            Login
          </a>
          <a href="/register">Register</a>
        </nav>
      </header>
      <img src={Img} alt="background" className="bg-image" />
      {/* Main Login Form */}
      <main className="login-page">
        
        <div className="login-box">
          <h2>Welcome Back</h2>
          <p className="subtitle">Log in to access your account</p>
          <input
            type="text"
            className="login-input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
          <input
            type="password"
            className="login-input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
          <button className="login-button" onClick={handleLogin}>
            Login
          </button>
           <div className="login-links">
            {/* <p className="forgot" >
              Forgot Password?
            </p> */}
            <p className="signup">
              Don’t have an account?{" "}
              <span onClick={() => navigate("/register")}>Sign up</span>
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};


// import React, { useState } from "react";
// import axios from "axios";
// import { useNavigate } from "react-router-dom";
// import "./Login.css";


// export const Login = ({ setToken }) => {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await axios.post("http://localhost:3000/auth/login", {
//         username,
//         password,
//       });

//       //  Save to localStorage
//       localStorage.setItem("token", res.data.token);
//       localStorage.setItem("role", res.data.role);
//       localStorage.setItem("username", username);

//       setToken(res.data.token);

//       //  Redirect based on role
//       if (res.data.role === "admin") {
//         navigate("/admin-dashboard");
//       } else {
//         navigate("/user-dashboard");
//       }
//     } catch (err) {
//       setError(err.response?.data?.error || "Login failed");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>Login</h2>
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
//       <button onClick={handleLogin}>Login</button>
//       {error && <p className="error">{error}</p>}
//     </div>
//   );
// };
