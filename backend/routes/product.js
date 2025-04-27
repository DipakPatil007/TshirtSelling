const express = require("express");
const router = express.Router();

//destructuring controllers 
const { isSigned, isAuthenticated, isAdmin } = require('../controllers/auth');
const { getUserById } = require("../controllers/user");
const { getProductById,
    createProduct,
    getProduct,
    photo,
    updateProduct,
    deleteProduct,
    getAllProducts,
    getAllUniqueCategories } = require("../controllers/product");

//all of params
router.param("userId", getUserById);
router.param("productId", getProductById);

//all actual Routes
router.post("/product/create/:userId", isSigned, isAuthenticated, isAdmin, createProduct); //create product
router.get("/product/:productId", getProduct); //get the product 
router.get("/product/photo/:productId", photo); //get the photo
router.put("/product/:productId/:userId", isSigned, isAuthenticated, isAdmin, updateProduct); //update the product details
router.delete("/product/:productId/:userId", isSigned, isAuthenticated, isAdmin, deleteProduct); //delete product
router.get("/products", getAllProducts); // get all products
router.get("/product/categories", getAllUniqueCategories);

module.exports = router;