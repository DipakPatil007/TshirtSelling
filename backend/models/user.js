var mongoose = require('mongoose');
var Schema = mongoose.Schema;
const crypto = require('crypto');
const uuid = require('uuid/v1');

/* This code is defining a Mongoose schema for a user in a MongoDB database. The schema includes fields
for the user's name, last name, email, user information, encrypted password, salt, role, and
purchases. The `timestamps` option is set to `true`, which means that Mongoose will automatically
add `createdAt` and `updatedAt` fields to the schema. */

var userSchema = new Schema({
    name: {
        type: String,
        required: true,
        maxlength: 32,
        trim: true
    },
    lastname: {
        type: String,
        maxlength: 32,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    userinfo: {
        type: String,
        trim: true
    },
    encry_password: {
        type: String,
        required: true
    },
    salt: String,
    role: {
        type: Number,
        default: 0
    },
    purchases: {
        type: Array,
        default: []
    }
}, {
    timestamps: true
});

// The `virtual` method is used to define a virtual property on the schema. In this case, it defines a
// virtual property called `password` that is used to set and get the user's password. When the password
// is set, it generates a salt using the `uuid` function and encrypts the password using the `securePassword` method.

userSchema.virtual("password")
    .set(function (password) {
        this._password = password;
        this.salt = uuid();
        this.encry_password = this.securePassword(password);
    })

    .get(function () {
        return this._password;
    })


userSchema.methods = {
    authenticate: function (plainpassword) {
        return this.encry_password === this.securePassword(plainpassword);
    },
    securePassword: function (plainpassword) {
        if (!plainpassword) return "";
        try {
            return crypto
                .createHmac('sha256', this.salt)
                .update(plainpassword)
                .digest('hex');
        } catch (err) {
            return "";
        }
    }
}


/* `module.exports` is a special object in Node.js that is used to define what a module exports when it
is required in another file. In this case, `mongoose.model('user', userSchema)` creates a model for
a user in the MongoDB database using the `userSchema` schema defined earlier. This model is then
assigned to `module.exports`, which means that when this file is required in another file, the
`user` model can be accessed and used in that file. */
module.exports = mongoose.model('User', userSchema);