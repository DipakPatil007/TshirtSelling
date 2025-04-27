// const stripe = require("stripe")("sk_test_51NeCS9SDUIfcfETBVcFVphHR7uFFUtj9XxJ7WwElTtASYlf8LmRgFpPvrItl0mQf4YYghKvk1kDWVXZuVJNKDuAI0030EhQkzo");
// const uuid = require("uuid/v4");

// const stripemakepayment = (req, res) => {
//   const { products, token } = req.body;
//   console.log("token", token);
//   console.log("products", products);

//   let amount = 0;
//   products.map((product) => {
//     amount += product.price;
//   });

//   const idempotencyKey = uuid();

//   return stripe.customers
//     .create({
//       email: token.email,
//       source: token.id,
//     })
//     .then((customer) => {
//       stripe.paymentIntents.create(
//         {
//           amount: amount * 100,
//           currency: "usd",
//           customer: customer.id,
//           receipt_email: token.email,
//           description:"A test account",
//           shipping: {
//             name: token.card.name,
//             address: {
//               country: token.card.address_country,
//             },
//           },
//         },
//         { idempotencyKey : idempotencyKey }
//       );
//     })
//     .then((result) => res.status(200).json(result))
//     .catch((err) => console.log(err));
// };

// module.exports = { stripemakepayment };
