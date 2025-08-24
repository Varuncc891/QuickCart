import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <nav className="navbar">
        <div className="logo">QuickCart</div>
        <div className="nav-links">
          <Link to="/adminlogin" className="nav-link">ADMIN</Link>
          <Link to="/login" className="nav-link">Login</Link>
          <Link to="/register" className="nav-link">Register</Link>

        </div>
      </nav>

      <div className="main-content">
        <div className="left-section">
          <h1 className="headline">Rapidly grown into a leading eCommerce platform</h1>
          <p className="description">
            Founded in 2025, QuickCart empowers users to seamlessly buy and sell products. 
            With a user-first interface, robust cart system, and secure payment integration, 
            it provides an efficient, modern eCommerce experience tailored for speed and simplicity.
          </p>
        </div>
        <div className="right-section">
          <img className = "imageshp" src="/hoempage.png" alt="Homepage" />
        </div>
      </div>
    </div>
  );
}
