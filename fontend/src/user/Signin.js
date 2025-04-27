import React, { useState } from "react";
import Base from "../core/Base";
import { Navigate, useNavigate } from "react-router-dom";
import { signin, authenticate, isAuthenticated } from "../auth/helper/index";


const Signin = () => {
  const navigate = useNavigate();

  const [values, setvalues] = useState({
    email: "",
    password: "",
    error: "",
    loading: false,
    didRedirect: false,
  });

  const { email, password, error, loading, didRedirect } = values;
  const { user } = isAuthenticated();

  /**
   * The handleChange function is used to update the values state object in React, with the ability to
   * handle changes for multiple input fields.
   */
  const handleChange = (name) => (event) => {
    setvalues({ ...values, error: false, [name]: event.target.value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setvalues({...values,error:false,loading:true});
    signin({email,password})
    .then(data =>{
      if(data.error){
        setvalues({...values,error:data.error,loading:false});
      }
      else{
        authenticate(data, () =>{
          setvalues({...values, didRedirect:true})
        })
      }
    })
    .catch((err)=>{console.log(err)})
  }

  const performRedirect = () => {
    if(didRedirect){
      if(user && user.role === 1){
        return <Navigate to={'/admin/dashboard'}/>
      }
      else{
        return <Navigate to={'/user/dashboard'}/>
      }
    }
    if(isAuthenticated()){
      return <redirect to="/"></redirect>
    }
  }

  const LoadingMessage = () => {
    return (
      loading && (
        <div className="alert alert-info">
          <h2>Loading...</h2>
        </div>
      )
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

  const signInForm = () => {
    return (
      <div className="row">
        <div className="col-md-6 offset-sm-3 text-left">
          <form>
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
                Sign In
              </button>
            </div>
            {/* <button className="btn btn-success btn-block my-3 rounded pb-2">
              Sign In
            </button> */}
          </form>
        </div>
      </div>
    );
  };

  return (
    <>
      <Base title="SignIn" description="A page for user to SignIn!">
        {LoadingMessage()}
        {errorMessage()}
        {signInForm()}
        {performRedirect()}
      </Base>
    </>
  );
};

export default Signin;
