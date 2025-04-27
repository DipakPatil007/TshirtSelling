import React from "react";
import Base from "../core/Base";
import { isAuthenticated } from "../auth/helper/index";
import { Link } from "react-router-dom";

const AdminDashboard = () => {
  const {
    user: { name, email, role },
  } = isAuthenticated();

  const AdminLeftSide = () => {
    return (
      <div className="card">
        <h5 className="card-header bg-dark text-white">Admin Navigation</h5>
        <ul className="list-group">
          <li className="list-group-item">
            <Link
              className="nav-link text-dark fw-bold"
              to={"/admin/create/category"}
            >
              Create Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="nav-link text-dark fw-bold"
              to={"/admin/categories"}
            >
              Manage Categories
            </Link>
          </li>
          <li className="list-group-item">
            <Link
              className="nav-link text-dark fw-bold"
              to={"/admin/create/product"}
            >
              Create Product
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-dark fw-bold" to={"/admin/products"}>
              Manage Products
            </Link>
          </li>
          <li className="list-group-item">
            <Link className="nav-link text-dark fw-bold" to={"/admin/orders"}>
              Manage Orders
            </Link>
          </li>
        </ul>
      </div>
    );
  };

  const AdminRightSide = () => {
    return (
      <div className="card mb-4">
        <h5 className="card-header">Admin Information</h5>
        <ul className="list-group">
          <li className="list-group-item">
            <span className="badge bg-success">Name : </span> {name}
          </li>
          <li className="list-group-item">
            <span className="badge bg-success">Email : </span> {email}
          </li>
          <li className="list-group-item">
            <span className="badge bg-success">Role  : </span> {role===1 ? "admin" : "user"}
          </li>
        </ul>
      </div>
    );
  };

  return (
    <div>
      <Base
        title="Welcome to admin area"
        description="Manage all of Products Here..."
        className="container bg-success p-4"
      >
        <div className="row">
          <div className="col-3">{AdminLeftSide()}</div>
          <div className="col-9">{AdminRightSide()}</div>
        </div>
      </Base>
    </div>
  );
};

export default AdminDashboard;
