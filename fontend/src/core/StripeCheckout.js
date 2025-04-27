// import React, { useState, useEffect } from "react";
// import { isAuthenticated } from "../auth/helper";
// import { cartEmpty, loadAllProductsToCart } from "./helper/cartHelper";
// import { Link, json } from "react-router-dom";
// import StripeCheckoutButton from "react-stripe-checkout";
// import { API } from "../backend";

// const StripeCheckout = ({
//   products,
//   setreload = (f) => f,
//   reload = undefined,
// }) => {
//   const [data, setdata] = useState({
//     loading: false,
//     success: false,
//     error: "",
//     address: "",
//   });

//   const token = isAuthenticated() && isAuthenticated().token;
//   const userId = isAuthenticated() && isAuthenticated().user._id;

//   const getFinalPrice = () => {
//     let amount = 0;
//     // products.map((product) => {
//     //   amount += product.price;
//     // });
//     for (let index = 0; index < products.length; index++) {
//       amount += products[index].price;
//     }
//     return amount;
//   };

//   // const makepayment = (token) => {
//   //   const body = {
//   //     token,
//   //     products,
//   //   };

//   //   const headers = {
//   //     "Content-Type": "application/json",
//   //   };

//   //   return fetch(`${API}/payment`, {
//   //     method: "POST",
//   //     headers,
//   //     body: JSON.stringify(body),
//   //   })
//   //   .then(() => alert("Payment Successful"))
//   //   .catch(({ message }) => console.log(`Error ${message}`));
//   // };

//   // const showStripeButton = () => {
//   //   return isAuthenticated() ? (
//   //     <StripeCheckoutButton
//   //       stripeKey="pk_test_51NeCS9SDUIfcfETB4CVBewWiw9ugNmBPHtddLuD87aSjrJ4JDSmSiVwrgZzAvKT8C5plgE1Y0DQV4anOG8eQHWXw00Sg0MnxTL"
//   //       token={makepayment}
//   //       amount={getFinalPrice() * 100}
//   //       name="Buy tshirt"
//   //       // shippingAddress
//   //       // billingAddress
//   //     >
//   //       <button className="btn btn-success rounded">Checkout</button>
//   //     </StripeCheckoutButton>
//   //   ) : (
//   //     <Link className="btn btn-warning rounded" to="/signin">
//   //       Signin
//   //     </Link>
//   //   );
//   // };

//   const showStripeButton = () => {
//     return isAuthenticated() ? (
//         <button className="btn btn-success rounded">Checkout</button>
//     ) : (
//       <Link className="btn btn-warning rounded" to="/signin">
//         Signin
//       </Link>
//     );
//   };


//   return (
//     <div>
//       <h4 className="text-white">Stripe Checkout {getFinalPrice()}</h4>
//       {showStripeButton()}
//     </div>
//   );
// };

// export default StripeCheckout;
