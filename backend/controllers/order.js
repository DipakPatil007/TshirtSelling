const { Order, ProductCart } = require("../models/order");

//get the order by Id
const getOrderById = (req, res, next, id) => {
  Order.findById(id)
    .populate("products.product", "name price")
    .exec((err, order) => {
      if (err || !order) {
        return res.status("400").json({
          error: "No order found",
        });
      }
      req.order = order;
      next();
    });
};

//create order
const createOrder = (req, res) => {
  req.body.order.user = req.profile;
  const order = new Order(req.body.order);
  
  order.save((err, savedOrder) => {
    if (err) {
      return res.status(500).json({
        error: "Failed to create the order",
      });
    }

    res.status(201).json(savedOrder); // Send the saved order as a response with a status code of 201 (Created)
  });
};

//get the all order
const getAllOrders = (req, res) => {
  Order.find()
    .populate("user", "_id name")
    .exec((err, order) => {
      if (err || !order) {
        return res.status("400").json({
          error: "no orders found",
        });
      }
      res.json(order);
    });
};

//get the status of the order
const getOrderStatus = (req, res) => {
  res.json(Order.schema.path("status").enumValues);
};

//update status of the order
// const updateStatus = (req, res) => {
//   Order.updateOne(
//     { _id: req.body.orderId },
//     { $set: { status: req.body.status } },
//     (err, order) => {
//       if (!order && !err) {
//         return res.status("400").json({
//           error: "Could not find the specified order",
//         });
//       }
//       res.json(order);
//     }
//   );
// };
const updateStatus = (req, res) => {
  Order.updateOne(
    { _id: req.body.orderId },
    { $set: { status: req.body.status } },
    (err, result) => {
      if (err) {
        return res.status(400).json({
          error: "Could not update the specified order status",
        });
      }

      if (result.nModified === 0) {
        return res.status(400).json({
          error: "Could not find the specified order",
        });
      }

      res.json({ message: "Order status updated successfully" });
    }
  );
};


module.exports = {
  getOrderById,
  createOrder,
  getAllOrders,
  getOrderStatus,
  updateStatus,
};
