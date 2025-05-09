const Product = require("../models/product");
const formidable = require('formidable');
const _ = require('lodash');
const fs = require('fs');

//get the product by Id comming through url
const getProductById = (req, res, next, id) => {
    Product.findById(id)
        .populate("category")
        .exec((err, product) => {
            if (err || !product) {
                return res.status(400).json({
                    error: "No product found in DB"
                });
            }
            req.product = product;
            next();
        });
}

//create products
const createProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                err: 'Image could not be uploaded'
            });
        }

        // Validation on the fields Check if all required fields are present
        const { name, description, price, category, stock } = fields;
        if (
            !name ||
            !description ||
            !price ||
            !category ||
            !stock
        ) {
            return res.status(404).json({
                error: "Please provide all required field"
            })
        }

        let product = new Product(fields);

        // Handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: 'File size should be less than or equal to 3MB',
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //save to DB
        product.save((err, prod) => {
            if (err) {
                return res.status(400).json({
                    error: 'Error while creating the product.',
                });
            }
            res.json(prod);
        });

    });
}

//retrive all products
const getProduct = (req, res) => {
    req.product.photo = undefined;
    return res.json(req.product);
}

//To optimize the loading time of the image 
//we are using this function to get the image from the database and send it to the client
const photo = (req, res, next) => {
    if (req.product.photo.data) {
        res.set("Content-Type", req.product.photo.contentType);
        return res.send(req.product.photo.data);
    }
    next();
}

//update product details
const updateProduct = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) {
            return res.status(400).json({
                err: 'Image could not be uploaded'
            });
        }
        //using lodash we update the product
        let product = req.product;
        product = _.extend(product, fields); // extend function from lodash library is used to copy one object into another object

        //handle file here
        if (file.photo) {
            if (file.photo.size > 3000000) {
                return res.status(400).json({
                    error: 'File size should be less than or equal to 3MB',
                });
            }
            product.photo.data = fs.readFileSync(file.photo.path);
            product.photo.contentType = file.photo.type;
        }

        //save to DB
        product.save((err, prod) => {
            if (err) {
                return res.status(400).json({
                    error: 'Error while updating the product.',
                });
            }
            res.json(prod);
        });

    });
}

//delete product from database
const deleteProduct = (req, res) => {
    let product = req.product;
    product.remove((err, deletedProduct) => {
        if (err) {
            return res.status(500).json({ error: 'Failed To Delete The Product.' });
        }
        res.json("deletion is successfull.");
    });
}

//get all products
const getAllProducts = (req, res) => {
    //For pagination we can use limit and sort by query parameters
    //limit is used to limit the number of products to be fetched from the database
    let limit = req.query.limit ? parseInt(req.query.limit) : 8;
    //sortBy is used to sort the products by a specific field
    let sortBy = req.query.sortBy ? req.query.sortBy : "_id";

    Product.find()
        .select("-photo")
        .populate("category")
        .sort([[sortBy, "asc"]])
        .limit(limit)
        .exec((err, product) => {
            if (!product || err) {
                return res.status(400).json({
                    message: 'No Products Found!'
                });
            }
            res.json(product);
        });
}

//get all unique categories
const getAllUniqueCategories = (req, res) => {
    Product.distinct("category", {}, (err, category) => {
        if (err) {
            return res.status(400).json({
                errorMessage: "Error while fetching categories!"
            });
        }
        res.json(category);
    });
}

//changing the stock and sold in the DB
const updateStock = (req, res, next) => {
    let myOperations = req.body.order.products.map(prod => {
        return {
            updateOne: {
                filter: { _id: prod._id },
                update: { $inc: { "stock": -1 * prod.count, "sold": +1 * prod.count } }
            }
        }
    });

    Product.bulkWrite(myOperations, {}, (err, products) => {
        if (err) {
            return res.status(400).json({
                error: "Bulk operation is failed"
            });
        }
    });
    next();
}

//exports all controller
module.exports = { getProductById, createProduct, getProduct, photo, updateProduct, deleteProduct, getAllProducts, updateStock, getAllUniqueCategories };