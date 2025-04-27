import React, { useState, useEffect } from "react";
import { isAuthenticated } from "../auth/helper";
import { getmeToken, paymentProcess } from "./helper/paymentbHelper";
import DropIn from "braintree-web-drop-in-react";
import { createOrder } from "./helper/orderHelper";
import { cartEmpty } from "./helper/cartHelper";

const Paymentb = ({ products, setreload = (f) => f, reload = undefined }) => {
  const [info, setinfo] = useState({
    loading: false,
    success: false,
    clientToken: null,
    error: "",
    instance: null, // Initialize instance to null initially
  });

  const userId = isAuthenticated() && isAuthenticated().user._id;
  const token = isAuthenticated() && isAuthenticated().token;

  const getToken = (userId, token) => {
    getmeToken(userId, token).then((data) => {
      if (data.error) {
        setinfo({ ...info, error: data.error, success: false });
      } else {
        setinfo({
          clientToken: data.clientToken,
        });
      }
    });
  };

  useEffect(() => {
    getToken(userId, token);
  }, []);

  const onPurchase = () => {
    setinfo({ ...info, loading: true }); // Spread the existing info values
    info.instance
      .requestPaymentMethod()
      .then(({ nonce }) => {
        const paymentData = {
          paymentMethodNonce: nonce,
          amount: getAmount(),
        };
        paymentProcess(userId, token, paymentData)
          .then((response) => {
            setinfo({ ...info, loading: false, success: response.success });
            console.log("Payment Success");
            const orderData = {
              products: products,
              transaction_id: response.transaction.id,
              amount: response.transaction.amount,
            };
            // createOrder(userId, token, orderData)
            cartEmpty(() => {
              console.log("Did we got a crash?");
            });

            setreload(!reload);
          })
          .catch((error) => {
            console.log("Error", error);
            setinfo({ ...info, loading: false, success: false });
            console.log("Payment Failed");
          });
      })
      .catch((error) => {
        console.log("Error", error);
        setinfo({ ...info, loading: false, success: false });
      });
  };

  const getAmount = () => {
    let amount = 0;
    products &&
      products.forEach((product) => {
        amount += product.price;
      });
    return amount;
  };

  const showDropIn = () => {
    return (
      <div>
        {info.clientToken !== null && products && products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: info.clientToken }}
              onInstance={(instance) =>
                setinfo({ ...info, instance: instance })
              }
            />
            <button
              type="button"
              className="btn btn-block btn-outline-success rounded mt-3 col-4"
              onClick={onPurchase}
            >
              Buy
            </button>
            <button
              type="button"
              className="btn btn-block btn-outline-danger rounded mt-3 col-4 ms-3"
            >
              Cancel
            </button>
          </div>
        ) : (
          <h3>Please Login or Add Something to Cart</h3>
        )}
      </div>
    );
  };

  return (
    <div>
      <h3 className="text-white">Your Total Cart Value: {getAmount()}$</h3>
      {showDropIn()}
    </div>
  );
};

export default Paymentb;
