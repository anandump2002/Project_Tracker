import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Img from "../assets/project.jpg";


export const Home = () => {
  const navigate = useNavigate();

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
    <div className="home">
   
      <div className="home-content">
       
        <h1>Welcome to Project Tracker</h1>
        <button onClick={() => navigate("/login")} className="btn primary">
          Get Started
        </button>
      </div>
    </div>
    </div>
  );
};
