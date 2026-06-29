import React from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  return (
    <nav className="navbar" aria-label="Main navigation">
      <div className="navbar-container">
        <Link to="/home" className="navbar-logo">
          AuthApp
        </Link>
        <ul className="navbar-menu">
          <li>
            <NavLink to="/home" className={({ isActive }) => isActive ? "active" : ""}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/register" className={({ isActive }) => isActive ? "active" : ""}>
              Register
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
