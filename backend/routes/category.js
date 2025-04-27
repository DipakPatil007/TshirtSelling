const express = require("express");
const router = express.Router();

//destructure all the controllers or object 
const {getCategoryByID , createCategory ,getCategory , getAllCategory, updateCategory , removeCategory} = require("../controllers/category");
const {getUserById} = require("../controllers/user");
const {isSigned, isAdmin, isAuthenticated} = require("../controllers/auth");

//parameter 
router.param("userId", getUserById); //To extract user
router.param("categoryId", getCategoryByID); // To extract category

//Routes
router.post("/category/create/:userId", isSigned, isAuthenticated, isAdmin, createCategory); //create category
router.get("/category/:categoryId", getCategory); //get one category
router.get("/categories",getAllCategory); //get all category
router.put("/category/:categoryId/:userId",isSigned, isAuthenticated, isAdmin, updateCategory); //update category by userId and categoryId
router.delete("/category/:categoryId/:userId",isSigned, isAuthenticated, isAdmin,removeCategory); //remove category by userId and categoryId
module.exports = router;