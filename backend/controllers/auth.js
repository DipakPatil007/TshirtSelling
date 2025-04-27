const User = require('../models/user');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

//the callback you are exporting you should use the same name in the file where you include this function.
//signup
const signup = (req, res) => {

    /* The code `const errors = validationResult(req)` is using the `validationResult` function from
    the `express-validator` library to check if there are any validation errors in the `req`
    (request) object. */
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    /* This code is creating a new instance of the `user` model and saving it to the database. */
    const user = new User(req.body);
    user.save((err, user) => {
        if (err) {
            return res.status(400).json({
                err: "Not able to save user in database"
            })
        }
        return res.json({
            name: user.name,
            lastname: user.lastname,
            email: user.email
        });
    })
}

//signin
const signin = (req, res) => {
    const errors = validationResult(req);
    const { email, password } = req.body;

    if (!errors.isEmpty()) {
        return res.status(422).json({
            error: errors.array()[0].msg
        })
    }

    User.findOne({ email }, (err, user) => {
        if (err || !user) {
            return res.status(400).json({
                error: "Email not exists."
            })
        }

        if (!user.authenticate(password)) {
            return res.status(400).json({
                error: "Password is incorrect."
            })
        }
        //generate token for authentication of users
        const token = jwt.sign({ _id: user._id }, process.env.SECRET);
        //put token into cookie
        let now = new Date();
        res.cookie("token", token, { expire: now.setTime(now.getTime() + 1 * 3600 * 1000) });

        //send reponse to front end
        const { _id, name, email, role } = user;
        return res.json({ token, user: { _id, name, email, role } });

    })
}

//signout
/* The code `exports.signout = (req,res)=>{...}` is exporting a function called `signout`. This
function takes in two parameters, `req` and `res`, which represent the request and response objects
respectively. */
const signout = (req, res) => {
    res.clearCookie("token");
    res.json({
        message: "signout"
    });
}

//protected route using expressJwt
/* The code `const isSigned = expressJwt({ secret : process.env.SECRET, userProperty : "auth" })` is
creating a middleware function called `isSigned` using the `express-jwt` library. */
const isSigned = expressJwt({
    secret: process.env.SECRET,
    userProperty: "auth"
})

//custom middleware
const isAuthenticated = (req, res, next) => {
    let checker = req.profile && req.auth && req.profile._id == req.auth._id;
    if (!checker) {
        return res.status(403).json({
            error: "User not authorized!"
        })
    }
    next();
}

// This middleware will check that do the user role is admin or not
const isAdmin = (req, res, next) => {
    if (req.profile.role === 0) {
        return res.status(403).json({ error: "You are not allowed access" });
    }
    next();
}

// Need to exports the controller and middlewares, so that we can import it where ever we want 
module.exports = { signout, signup, signin, isSigned, isAuthenticated, isAdmin };