import React from "react";
import "./Navbar.css";
import { NavLink, Outlet } from "react-router-dom";

function Navbar() {
  return (
    <>
      <div className="nav-container">
        <ul>
          <NavLink to="/">
            <li className="logo">
              Food<span className="finder">Finder</span>
            </li>
          </NavLink>

          <NavLink to={"/add-meal"}>
            <li className="add_btn">+ Add Meal</li>
          </NavLink>
        </ul>
      </div>
      <Outlet />
    </>
  );
}

export default Navbar;
