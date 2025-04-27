import React from "react";
import { Link, useNavigate } from "react-router-dom";
//note withRouter is no longer exsists in the react router dom v6
import { signout, isAuthenticated } from "../auth/helper/index";

const currentTab = (path) => {
  if (window.location.pathname === path) {
    return { color: "#B884DA", fontWeight: "bold" };
  } else {
    return { color: "#FFFFFF", fontWeight: "bold" };
  }
};

const Menu = () => {
  const navigate = useNavigate();

  return (
    <div>
      <ul className="nav nav-tabs p-2 bg-dark rounded">
        <li className="nav-items">
          <Link style={currentTab("/")} className="nav-link rounded" to="/">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link style={currentTab("/cart")} className="nav-link rounded" to="/cart">
            Cart
          </Link>
        </li>
        {isAuthenticated() && isAuthenticated().user.role === 0 && (
          <li className="nav-item">
            <Link
              style={currentTab("/user/dashboard")}
              className="nav-link rounded"
              to="/user/dashboard"
            >
              U. Dashboard
            </Link>
          </li>
        )}
        {isAuthenticated() && isAuthenticated().user.role === 1 && (
          <li className="nav-item">
          <Link
            style={currentTab("/admin/dashboard")}
            className="nav-link rounded"
            to="/admin/dashboard"
          >
            A. Dashboard
          </Link>
        </li>
        )}
        {!isAuthenticated() && (
          <>
            <li className="nav-item">
              <Link
                style={currentTab("/signup")}
                className="nav-link rounded"
                to="/signup"
              >
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link
                style={currentTab("/signin")}
                className="nav-link rounded"
                to="/signin"
              >
                Sign In
              </Link>
            </li>
          </>
        )}
        {isAuthenticated() && (
          <li className="nav-item">
            <span
            style={{cursor:'pointer'}}
              className="nav-link text-warning cursors-pointer rounded"
              onClick={() => {
                signout(() => {
                  navigate("/");
                });
              }}
            >
              Signout
            </span>
          </li>
        )}
      </ul>
    </div>
  );
};

export default Menu;
