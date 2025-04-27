const Category = require("../models/category");

//extract details from database by category id 
const getCategoryByID = (req,res,next,id) => {
    Category.findById(id).exec((err, cate)=>{
        if(err ||!cate){
            return res.status(400).json({
                error: "No category found"
                });
        }
        req.category = cate;
        next();
    });
}

//create and save the category to db and send response back with success message
const createCategory = (req,res) => {
    const category = new Category(req.body);
    //save the data to db and send response back with success message
    category.save((err,data)=> {
        if(err){
            return res.status(400).json({
                errror:"Unable to save category in DB",
            });
        }
        res.json({data});
    });
}

//get specific category by ID
const getCategory = (req,res) => {
    return res.json(req.category);
}

//get all categories
const getAllCategory = (req,res) => {
    Category.find().exec((err,categories) =>{
        if(err|| !categories ){
            return res.status(400).json({
                error : 'no categories found'
                });
        }
        res.json(categories);
    });
}

//update Categories
const updateCategory = (req,res) => {
    const category = req.category;
    category.name = req.body.name;
    console.log(category.name);
    category.save((err,upcategory) => {
        if(err ||!upcategory )  {
            return res.status(400).json({
                error: "unable to updatte"
            });
        }
        res.json(upcategory);
    });
}

//remove category from database
const removeCategory = (req,res) =>{
    const category = req.category;
    category.remove((err,category)=>{
        if(err){
            return res.status(400).json({
                err:"Unable To Remove The Category"
            });
        }
        return res.json({
            message : `${category.name} and ${category._id} is Successfully deleted`
        });
    });
}


//export category
module.exports = {getCategoryByID , createCategory , getCategory , getAllCategory, updateCategory , removeCategory};