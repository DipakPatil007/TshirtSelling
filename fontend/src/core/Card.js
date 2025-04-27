import React, { useState, useEffect } from "react";
import ImageHelper from "./helper/ImageHelper";
import { Navigate, useNavigate } from "react-router-dom";
import { addItemToCart, removeItemFromCart } from "./helper/cartHelper";

const Card = ({
  product,
  addtoCart = true,
  removeFromCart = false,
  setreload = f => f,
  // function(f)(return f)
  reload = undefined,
}) => {
  //   const [redirect, setredirect] = useState(false);

  const navigate = useNavigate();

  const addToCart = () => {
    addItemToCart(product, () => navigate("/cart"));
  };

  //   const getRedirect = (redirect) => {
  //     if (redirect) {
  //       return navigate("/cart");
  //     }
  //   };

  const showAddToCart = (addtoCart) => {
    return (
      addtoCart && (
        <button
          onClick={addToCart}
          className="btn btn-block btn-outline-success mt-2 mb-2 rounded"
        >
          Add to Cart
        </button>
      )
    );
  };

  const showRemoveFromCart = (removeFromCart) => {
    return (
      removeFromCart && (
        <button
          onClick={() => {
            removeItemFromCart(product._id);
            setreload(!reload);
          }}
          className="btn btn-block btn-outline-danger mt-2 mb-2 rounded"
        >
          Remove from cart
        </button>
      )
    );
  };

  return (
    <div className="card text-white bg-dark border border-info ">
      <div className="card-header lead fw-bold">{product.name}</div>
      <div className="card-body">
        <ImageHelper product={product} />
        <p className="lead bg-success font-weight-normal text-wrap">
          {product.description}
        </p>
        <p className="btn btn-success rounded  btn-sm px-4">
          $ {product.price}
        </p>
        <div className="row">
          <div className="col-12">{showAddToCart(addtoCart)}</div>
          <div className="col-12">{showRemoveFromCart(removeFromCart)}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
