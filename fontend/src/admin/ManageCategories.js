import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../auth/helper";
import { deleteCategory, getCategories } from "./helper/adminapicall";

const ManageCategories = () => {
  const [categories, setcategories] = useState([]);

  const { user, token } = isAuthenticated();

  const preload = () => {
    getCategories().then((data) => {
      if (data.error) {
        console.log("Error in fetching categories");
      } else {
        setcategories(data);
      }
    });
  };

  useEffect(() => {
    preload();
  }, []);

  const deleteThisCategory = (categoryId) => {
    deleteCategory(categoryId, user._id, token).then((data) => {
      //console.log('delete',data,'from category')
      if (data.error) {
        console.log(data.error);
      } else {
        console.log("deleted successfully");
        preload();
      }
    });
  };

  return (
    <Base title="Welcome admin" description="Manage Category here">
      <h2 className="mb-4">All Categories:</h2>
      <Link
        className="btn btn-md btn-outline-light fw-bold rounded mb-3"
        to={"/admin/dashboard"}
      >
        Back
      </Link>
      <div className="row">
        <div className="col-12">
          <h2 className="text-center text-white my-3">
            Total {categories.length} Categories
          </h2>

          {categories.map((cate, index) => {
            return (
              <div key={index} className="row text-center mb-2 ">
                <div className="col-4">
                  <h3 className="text-white text-left">{cate.name}</h3>
                </div>
                <div className="col-4">
                  <Link
                    className="btn btn-success rounded-3"
                    to={`/admin/category/update/${cate._id}`}
                  >
                    <span className="">Update</span>
                  </Link>
                </div>
                <div className="col-4">
                  <button
                    onClick={() => {
                      let conf = "Do you really want to delete this category?";
                      if (window.confirm(conf) == true) {
                        deleteThisCategory(cate._id);
                      }
                    }}
                    className="btn btn-danger rounded-3"
                  >
                    Delete
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Base>
  );
};

export default ManageCategories;
