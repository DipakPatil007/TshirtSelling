const express = require("express");
const router = express.Router();
const { isSigned, isAuthenticated, isAdmin } = require("../controllers/auth");
const { paymentProcess, getToken } = require("../controllers/paymentb");
const {getUserById} = require("../controllers/user")

//make sure that in every routes where Id is included in in the url then you have to use this this paea
router.param("userId" , getUserById);

router.get("/payment/gettoken/:userId", isSigned, isAuthenticated, getToken);
router.post(
  "/payment/braintree/:userId",
  isSigned,
  isAuthenticated,
  paymentProcess
);

module.exports = router;
