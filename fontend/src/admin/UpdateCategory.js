import React, { useEffect, useState } from "react";
import { isAuthenticated } from "../auth/helper";
import { Link, useParams } from "react-router-dom";
import Base from "../core/Base";
import { getCategory, updateCategory } from "./helper/adminapicall";

const UpdateCategory = () => {
  const [name, setname] = useState("");
  const [error, seterror] = useState(false);
  const [sucess, setsucess] = useState(false);

  const { user, token } = isAuthenticated();

  const { categoryId } = useParams();

  const preload = () => {
    getCategory(categoryId).then((data) => {
      if (data.error) {
        console.log(data.error);
      } else {
        setname(data.name);
      }
    });
  };
  useEffect(() => {
    preload();
  }, []);

  const onSubmit = (event) => {
    event.preventDefault();
    seterror("");
    setsucess(false);
    setname(name);

    // //update category
    updateCategory(categoryId, user._id, token, { name })
      .then((data) => {
        if (!data) {
          throw new Error("Error in creating a category");
        } else {
          console.log("category updated");
          setsucess(true);
          setname("");
        }
      })
      .catch(() => {
        seterror(`An error occured while adding ${name}`);
      });
  };

  const successMessage = () => {
    if (sucess) {
      return (
        <h4 className="text-success mt-3"> Category is updated successfully</h4>
      );
    }
  };

  const errorMessage = () => {
    if (error) {
      return <h4 className="text-danger mt-3">Failed to updated categorys</h4>;
    }
  };

  const MyCategoryForm = () => {
    return (
      <form>
        <div className="form-group my-3">
          <p className="lead my-3 fw-bold">Enter the Category :</p>
          <input
            type="text"
            className="form-control my-3"
            value={name}
            onChange={(e) => setname(e.target.value)}
            autoFocus
            required
            placeholder=""
          />
          <div className="row">
            <div className="col">
              <button
                onClick={onSubmit}
                className="btn btn-outline-success fw-bold rounded"
              >
                Update Category
              </button>
              <Link to="/admin/categories">
                <button className="btn btn-outline-danger fw-bold rounded ms-2">
                  Back
                </button>
              </Link>
            </div>
          </div>
        </div>
      </form>
    );
  };

  return (
    <>
      <Base
        title="Update a category here"
        description="update category for new tshirt"
        className="container bg-success p-5 mb-5"
      >
        <div className="row bg-white rounded">
          <div className="col-md-8 offset-md-2">
            {successMessage()}
            {errorMessage()}
            {MyCategoryForm()}{" "}
          </div>
        </div>
      </Base>
    </>
  );
};

export default UpdateCategory;
