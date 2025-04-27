import React, { useEffect, useState } from "react";
import Base from "../core/Base";
import { Link, Navigate, useParams } from "react-router-dom";
import {
  getCategories,
  getProduct,
  updateProduct,
} from "./helper/adminapicall";
import { isAuthenticated } from "../auth/helper";

const UpdateProduct = ({ match }) => {
  const { productId } = useParams();

  const { user, token } = isAuthenticated();

  const [values, setvalues] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    photo: "",
    categories: [],
    category: "",
    loading: false,
    error: "",
    createdProduct: "",
    getRedirect: false,
    formData: "",
  });

  const {
    name,
    description,
    price,
    stock,
    photo,
    categories,
    category,
    loading,
    error,
    createdProduct,
    getRedirect,
    formData,
  } = values;

  const preload = (productId) => {
    getProduct(productId).then((data) => {
      console.log(data);
      if (data && data.error) {
        setvalues({ ...values, error: data.error });
      } else {
        preloadCategories();
        setvalues({
          ...values,
          name: data.name,
          description: data.description,
          price: data.price,
          category: data.category,
          stock: data.stock,
          formData: new FormData(),
        });
        
      }
    });
  };

  const preloadCategories = () => {
    getCategories().then((data)=>{
        if(data.error){
            console.log(data.error);
        }
        else{
            setvalues({
                categories:data,
                formData : new FormData()
            })
        }
    })
  }
  useEffect(() => {
    preload(productId);
  }, []);

  const handleChange = (name) => (event) => {
    const value = name === "photo" ? event.target.files[0] : event.target.value;
    formData.set(name, value);
    setvalues({ ...values, [name]: value });
  };

  //Todo : work on it
  const onSubmit = (event) => {
    event.preventDefault();
    setvalues({ ...values, error: "", loading: true });

    updateProduct(productId ,user._id, token, formData).then((data) => {
      if (data && data.error) {
        setvalues({
          ...values,
          error: data.error,
        });
      } else {
        setvalues({
          ...values,
          name: "",
          description: "",
          price: "",
          stock: "",
          photo: "",
          loading: false,
          createdProduct: data.name,
          getRedirect: true,
        });
      }
    });
  };

  const successMessage = () => {
    return (
      <div
        className="alert alert-success mt-3"
        style={{ display: createdProduct ? "" : "none" }}
      >
        <h4>{createdProduct} Updated Successfully</h4>
      </div>
    );
  };

  const errorMessage = () => {
    <div
      className="alert alert-danger mt-3"
      style={{ display: error ? "" : "none" }}
    >
      <h4>{error} while Updating product.</h4>
    </div>;
  };

  // const performRedirect = () => {
  //   if(getRedirect){
  //     <Navigate to={''}/>
  //   }
  // }

  const createProductForm = () => (
    <form className="mt-3 mb-3">
      <span>Post photo</span>
      <div className="form-group mb-3">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("name")}
          name="photo"
          className="form-control"
          placeholder="Name"
          value={name}
        />
      </div>
      <div className="form-group mb-3">
        <textarea
          onChange={handleChange("description")}
          name="photo"
          className="form-control"
          placeholder="Description"
          value={description}
        />
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("price")}
          type="number"
          className="form-control"
          placeholder="Price"
          value={price}
        />
      </div>
      <div className="form-group mb-3">
        <select
          onChange={handleChange("category")}
          className="form-control"
          placeholder="Category"
        >
          <option>Select</option>
          {categories &&
            categories.map((cate, index) => (
              <option key={index} value={cate._id}>
                {cate.name}
              </option>
            ))}
        </select>
      </div>
      <div className="form-group mb-3">
        <input
          onChange={handleChange("stock")}
          type="number"
          className="form-control"
          placeholder="Quantity"
          value={stock}
        />
      </div>

      <button
        type="submit"
        onClick={onSubmit}
        className="btn btn-outline-success rounded"
      >
        Update Product
      </button>
      <div
        onClick={() => {
          setvalues({
            ...values,
            name: "",
            description: "",
            price: "",
            category: "",
            stock: "",
          });
        }}
        className="btn btn-outline-danger ms-3 rounded"
      >
        Clear
      </div>
    </form>
  );

  return (
    <Base
      title="Add a product here"
      description="Welcome to product creation section"
      className="container bg-success p-5 mb-3"
    >
      <Link
        className="btn btn-md btn-outline-light fw-bold rounded mb-3"
        to={"/admin/products"}
      >
        Back
      </Link>
      <div className="row bg-white text-dark rounded">
        <div className="col-md-8 offset-md-2">
          {successMessage()}
          {errorMessage()}
          {createProductForm()}
        </div>
      </div>
    </Base>
  );
};

export default UpdateProduct;
