import React, { useState } from "react";
import Base from "../core/Base";
import { signup } from "../auth/helper/index";
import { Link } from "react-router-dom";

const Signup = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",
    error: "",
    success: false,
  });

  const { name, email, password, error, success } = values;

  /**
   * The handleChange function is used to update the values state object in React, with the ability to
   * handle changes for multiple input fields.
   */
  const handleChange = (name) => (event) => {
    setValues({ ...values, error: false, [name]: event.target.value });
  };

  /**
   * The `onSubmit` function handles form submission, calls the `signup` function with the provided
   * name, email, and password, and updates the state values based on the response.
   */
  const onSubmit = (event) => {
    event.preventDefault();
    setValues({ ...values, error: false });
    /* The code block you provided is handling the form submission in the `onSubmit` function. */
    signup({ name, email, password })
      .then((data) => {
        if (data.error) {
          setValues({ ...values, error: data.error, success: false });
        } else {
          setValues({
            ...values,
            name: "",
            email: "",
            password: "",
            error: "",
            success: true,
          });
        }
      })
      .catch((err) => console.log(err));
  };

  const signUpForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
            <div className="form-group">
              <label className="text-light my-1">Name</label>
              <input
                className="form-control"
                onChange={handleChange("name")}
                type="text"
                value={name}
              />
            </div>
            <div className="form-group">
              <label className="text-light my-1">Email</label>
              <input
                className="form-control"
                onChange={handleChange("email")}
                type="email"
                value={email}
              />
            </div>
            <div className="form-group">
              <label className="text-light my-1">Password</label>
              <input
                className="form-control"
                onChange={handleChange("password")}
                type="password"
                value={password}
              />
            </div>
            <div className="d-grid mt-3 col-6 offset-3">
              <button
                onClick={onSubmit}
                className="btn btn-success rounded"
                type="button"
              >
                Sign Up
              </button>
            </div>
            {/* <button className="btn btn-success btn-block my-3 rounded pb-2">
              Sign Up
            </button> */}
          </form>
        </div>
      </div>
    );
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success  col-3 offset-6"
        style={{ display: success ? "" : "none" }}
      >
        New Account is created Successfully...<br/> 
        <Link style={{fontWeight:"bold"}} to="/signin">Login Here</Link>
      </div>
    );
  };

  const errorMessage = () => {
    return (
      <div
        className="alert alert-danger col-6 offset-3"
        style={{ display: error ? "" : "none" }}
      >
        {error}
      </div>
    );
  };

  return (
    <Base title="Signup" description="A page for user to Signup!">
      {error ? errorMessage() : successMessage()}
      {signUpForm()}
      <p className="text-white text-center">{JSON.stringify(values)}</p>
    </Base>
  );
};

export default Signup;
