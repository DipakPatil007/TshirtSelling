const express = require("express");
const router = express.Router();

const { getUserById , pushOrderInPurchaseList } = require("../controllers/user");
const {isSigned , isAuthenticated , isAdmin} = require("../controllers/auth");
const {updateStock} = require("../controllers/product");

const {getOrderById , createOrder , getAllOrders , getOrderStatus , updateStatus} = require("../controllers/order");

//params
router.param("userId", getUserById);
router.param("orderId", getOrderById);

//Routes
router.post("/order/create/:userId" , isSigned, isAuthenticated, pushOrderInPurchaseList, updateStock , createOrder); //create order
router.get("/order/all/:userId",isSigned,  isAuthenticated, isAdmin , getAllOrders); // get all order 
router.get("/order/status/:userId",isSigned, isAuthenticated , isAdmin , getOrderStatus); //status of order
router.put("/order/:orderId/status/:userId",isSigned, isAuthenticated , isAdmin, updateStatus); //update the status of the order

module.exports = router;