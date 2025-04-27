const User = require("../models/user");
const Order = require("../models/order");

/**
 * The function `getUserById` is a middleware function that retrieves a user by their ID and attaches
 * it to the request object.
 * @param req - The `req` parameter is the request object that contains information about the incoming
 * HTTP request, such as the headers, query parameters, and body.
 * @param res - The `res` parameter is the response object. It is used to send the response back to the
 * client.
 * @param next - The `next` parameter is a function that is used to pass control to the next middleware
 * function in the request-response cycle. It is typically used when you want to move to the next
 * middleware function after completing some operations in the current middleware function.
 * @param id - The `id` parameter is the unique identifier of the user that we want to retrieve. It is
 * used to search for the user in the database.
 */
const getUserById = (req,res,next,id) => {
    User.findById(id).exec((err, user) =>{
        if(err || !user){
            return res.status(400).json({
                error: "No valid user found"
            });
        }

        req.profile = user;
        // console.log(req.profile._id);
        next();
    });
}

/**
 * The function getUser modifies the req.profile object by hiding sensitive information and removing
 * timestamps, and then returns the modified object as a JSON response.
 * @param req - The `req` parameter is an object that represents the HTTP request made by the client.
 * It contains information such as the request headers, request body, request method, and request URL.
 * @param res - The `res` parameter is the response object that is used to send a response back to the
 * client. It contains methods and properties that allow you to control the response, such as `json()`
 * which is used to send a JSON response.
 * @returns a JSON response containing the user profile information.
 */
const getUser = (req,res) => {
    req.profile.salt = "****";
    req.profile.encry_password = "****";
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    return res.json(req.profile);
}

const updateUser = (req,res) =>{
  User.findByIdAndUpdate(
    {_id : req.profile._id},
    {$set : req.body},
    {new: true, useFindAndModify: true},
    (err,user) =>{
      if(err){
        return res.status(500).json({
          err :"An Error Occured While Updating Profile",
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

const userPurchaseList = (req,res) =>{
  Order.find({user : req.profile._id})
  .populate("user", "_id name")
  .exec((err,order) =>{
    if(err){
      return res.status(400).json({
        error : "No Order in this account"
      });
    }
    return res.json(order);
  });
}

const pushOrderInPurchaseList = (req,res,next) => {
  let purchases = []
  req.body.order.products.forEach(product => {
    purchases.push({
      _id : product._id,
      name : product.name,
      description : product.description,
      category : product.category,
      quantity : product.quantity,
      amount : req.body.order.amount,
      transaction_id : req.body.order.transaction_id
    });
  });

  User.findByIdAndUpdate(
    {_id : req.profile._id},
    {$push : {purchases:purchases}},
    {new : true},
    (err,purchase) =>{
      if(err){
        return res.status(400).json({
          error : "No purchase is found"
        });
      }
      next();
    }
  );

}

/* `module.exports = {getUserById , getUser};` is exporting the `getUserById` and `getUser` functions
as properties of an object. This allows other modules to import and use these functions by accessing
them as properties of the imported object. */
module.exports = {getUserById , getUser, updateUser, userPurchaseList, pushOrderInPurchaseList};