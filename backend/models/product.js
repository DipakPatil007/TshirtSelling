const mongoose = require('mongoose');
/* `const {ObjectId} = mongoose.Schema;` is destructuring the `ObjectId` property from the
`mongoose.Schema` object and assigning it to a constant variable named `ObjectId`. This is done so
that the `ObjectId` property can be used directly in the `productSchema` object without having to
reference it through the `mongoose.Schema` object every time. */
const {ObjectId} = mongoose.Schema;

/* This code is defining a Mongoose schema for a product in a MongoDB database. The schema includes
fields for the product's name, description, price, category (which is a reference to another schema
for categories), stock, sold, and photo. The schema also includes timestamps for when the product
was created and last updated. This schema will be used to create a model for the product in the
database. */
const productSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        maxlength : 32
    },
    description : {
        type : String,
        required : true,
        trim : true,
        maxlength : 2000
    },
    price : {
        type : Number,
        required : true,
        trim : true,
        maxlength : 32
    },
    category : {
        type : ObjectId,
        required : true,
        ref : 'Category'
    },
    stock : {
        type : Number,
    },
    sold :  {
        type : Number,
        default : 0
    },
    photo : {
        data : Buffer,
        contentType : String
    }
},{timestamps : true});

module.exports = mongoose.model('Product', productSchema);