import React, { useEffect, useState } from "react";
import "../styles.css";
import { API } from "../backend";
import Base from "./Base";
import Card from "./Card";
import { getProducts } from "./helper/coreapicalls";
import { loadAllProductsToCart } from "./helper/cartHelper";
import StripeCheckout from "./StripeCheckout";
import Paymentb from "./Paymentb";

const Cart = () => {
  const [products, setproducts] = useState([]);
  const [reload, setreload] = useState(false);

  useEffect(() => {
    setproducts(loadAllProductsToCart());
  }, [reload]);

  const loadAllProducts = (products) => {
    return (
      <div>
        <h4>This is a load cart section</h4>
        {products.map((product, index) => (
          <div className="mt-3">
            <Card
              key={index}
              product={product}
              addtoCart={false}
              removeFromCart={true}
              setreload={setreload}
              reload={reload}
            />
          </div>
        ))}
      </div>
    );
  };

  const loadCheckout = () => {
    return (
      <div>
        <h2>This is a Checkout sectionn</h2>
      </div>
    );
  };

  return (
    <Base title="Cart Page" description="Ready to checkout">
      <div className="row text-center">
        <div className="row">
          <div className="col-3 offset-1">
            {/* {products && products.length > 0 ? (
              loadAllProducts(products)
            ) : (
              <h3 className="text-white">No products in cart</h3>
            )} */}
            {products ? (
              products.length > 0 ? (
                loadAllProducts(products)
              ) : (
                <h3 className="text-white">No Products in The Cart ☹️☹️☹️</h3>
              )
            ) : (
              <h3 className="text-white">👍Cart Checkout Successful..👍</h3>
            )}
          </div>
          <div className="col-6 offset-1">
            <Paymentb
              products={products}
              setreload={setreload}
              reload={reload}
            />
          </div>
        </div>
      </div>
    </Base>
  );
};

export default Cart;
