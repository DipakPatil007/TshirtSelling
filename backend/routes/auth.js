var express = require("express");
var router = express.Router();
const { check, validationResult } = require('express-validator');

var { signout, signup, signin, isSigned } = require('../controllers/auth');

/* The code `router.post("/signup",[...]` is defining a route for the HTTP POST method on the "/signup"
endpoint. */
router.post("/signup", [
    /* The code is using the `check` function from the `express-validator` module to validate the "name","email and "password"
    field in the request body. */
    check("name", "Name field cannot be empty").not().isEmpty().isLength({ min: 3 }),
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Password must contain at least 8 characters with one uppercase letter").isStrongPassword()
], signup);

router.post("/signin", [
    /* The code is using the `check` function from the `express-validator` module to validate the "name","email and "password"
    field in the request body. */
    check("email", "Please enter a valid email address").isEmail(),
    check("password", "Password must contain at least 8 characters with one uppercase letter").isStrongPassword()
], signin);

router.get("/signout", signout);

//To test only the issigned is working or not
router.get("/testroute", isSigned, (req, res) => {
    res.json(req.auth);
})

/* `module.exports = router;` is exporting the `router` object so that it can be used in other modules
or files. */
module.exports = router;