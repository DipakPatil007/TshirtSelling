/* This code is importing the Mongoose library and destructuring the `ObjectId` property from the
`mongoose.Schema` object. The `ObjectId` property is used to define a unique identifier for each
document in a MongoDB collection. */
const mongoose = require('mongoose');
const {ObjectId} = mongoose.Schema;

/* This code defines a Mongoose schema for a product in a user's shopping cart. The schema includes
fields for the product's ID (referencing the "Product" model), name, count (quantity), and price.
The schema is then used to create a Mongoose model called "ProductCart". */
const ProductCartSchema = new mongoose.Schema({
    product: {
        type: ObjectId,
        ref: 'Product'
    },
    name : String,
    count : Number,
    price : Number,
});
const ProductCart = mongoose.model('ProductCart',ProductCartSchema);

/* This code defines a Mongoose schema for an order, which includes fields for an array of products
(referencing the "ProductCart" model), a transaction ID, the total amount of the order, the shipping
address, the date the order was last updated, and the user who placed the order (referencing the
"User" model). The schema is then used to create a Mongoose model called "Order". The "timestamps"
option is set to true, which automatically adds "createdAt" and "updatedAt" fields to the schema to
track when the order was created and last updated. */
const OrderSchema = new mongoose.Schema({
    products: [ProductCartSchema],
    transaction_id : {},
    amount : {type : Number},
    address : String,
    status : {
        type : String,
        default:'Recieved',
        enum : ['cancelled','Delivered','Shipped','Processing',"Recieved"]  
        },
    updated : Date,
    user: {
        type: ObjectId,
        ref: 'User'
    }
},{timestamps : true});

const Order = mongoose.model('Order', OrderSchema);

/* This code exports the `ProductCart` and `Order` models so that they can be used in other files in
the Node.js application. By setting `module.exports` to an object with `ProductCart` and `Order`
properties, other files can import this module and access these models by destructuring the object.
For example, another file could import this module with `const { ProductCart, Order } =
require('./models/cart');` and then use the `ProductCart` and `Order` models in that file. */ 
module.exports = {
    ProductCart,
    Order
}