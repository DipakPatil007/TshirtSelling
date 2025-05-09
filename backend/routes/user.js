const express = require('express');
const router = express.Router();

const { getUserById, getUser, updateUser, userPurchaseList } = require('../controllers/user');
const { isSigned, isAuthenticated, isAdmin } = require('../controllers/auth');

//Is is use to set the parameter and get the deatil of user by ID
// If somebody hit the URL /user/:userId then this function will be called and it will get the user by ID
// and set the req.profile to the user object
router.param("userId", getUserById);

//get the user 
router.get("/user/:userId", isSigned, isAuthenticated, getUser);

//update the user
router.put("/user/:userId", isSigned, isAuthenticated, updateUser);

//get user purchase list
router.get("/orders/user/:userId", isSigned, isAuthenticated, userPurchaseList)
//export this router so that we can use it 
module.exports = router;