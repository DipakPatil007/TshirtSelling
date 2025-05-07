const User = require("../models/user");
const Order = require("../models/order");

const getUserById = (req, res, next, id) => {
  User.findById(id).exec((err, user) => {
    if (err || !user) {
      return res.status(400).json({
        error: "No valid user found"
      });
    }

    req.profile = user;
    // console.log(req.profile._id);
    next();
  });
}

const getUser = (req, res) => {
  req.profile.salt = "****";
  req.profile.encry_password = "****";
  req.profile.createdAt = undefined;
  req.profile.updatedAt = undefined;
  return res.json(req.profile);
}

const updateUser = (req, res) => {
  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $set: req.body },
    { new: true, useFindAndModify: true },
    (err, user) => {
      if (err) {
        return res.status(500).json({
          err: "An Error Occured While Updating Profile",
        });
      }
      user.salt = "****";
      user.encry_password = "****";
      user.createdAt = undefined;
      user.updatedAt = undefined;
      res.json(user);
    }
  )
}

const userPurchaseList = (req, res) => {
  Order.find({ user: req.profile._id })
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err) {
        return res.status(400).json({
          error: "No Order in this account"
        });
      }
      return res.json(order);
    });
}

// This function is used to push the order details into the user's purchase list
// It takes the request, response and next function as parameters 
// It creates an empty array called purchases and then iterates over the products in the order
// For each product, it pushes an object containing the product details into the purchases array
const pushOrderInPurchaseList = (req, res, next) => {
  let purchases = []
  // get the product details from the order and push it into the purchases array
  req.body.order.products.forEach(product => {
    purchases.push({
      _id: product._id,
      name: product.name,
      description: product.description,
      category: product.category,
      quantity: product.quantity,
      amount: req.body.order.amount,
      transaction_id: req.body.order.transaction_id
    });
  });

  User.findByIdAndUpdate(
    { _id: req.profile._id },
    { $push: { purchases: purchases } },
    { new: true },
    (err, purchase) => {
      if (err) {
        return res.status(400).json({
          error: "No purchase is found"
        });
      }
      next();
    }
  );

}

/* `module.exports = {getUserById , getUser};` is exporting the `getUserById` and `getUser` functions
as properties of an object. This allows other modules to import and use these functions by accessing
them as properties of the imported object. */
module.exports = { getUserById, getUser, updateUser, userPurchaseList, pushOrderInPurchaseList };