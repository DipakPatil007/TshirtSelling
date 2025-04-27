//environment variable files 
// You can access the environment variables 
require('dotenv').config()

//middleware
/* These lines of code are importing and initializing various middleware functions and libraries for
the Express application. */
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser');
const cors = require('cors');

//Routes
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
const categoryRoutes = require("./routes/category");
const productRoutes = require("./routes/product");
const orderRoutes = require("./routes/order");
// const stripeRoutes = require("./routes/stripepayment")
const paymentRoutes = require("./routes/paymentb");

/* These lines of code are setting up middleware functions for the Express application. */
app.use(cors());
app.use(bodyParser.json());
app.use(cookieparser());
app.use(express.json());


//Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", categoryRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
// app.use("/api", stripeRoutes);
app.use("/api", paymentRoutes);

//Database connection
/* This code is connecting the Node.js application to a MongoDB database using the Mongoose library. It
is using the `mongoose.connect()` method to establish a connection to the database, with the
connection string specified in the `process.env.DATABASE` environment variable. The options object
passed to the method includes the `useNewUrlParser`, `useUnifiedTopology`, and `useCreateIndex`
options, which are used to configure the connection. */
//here we have use the javascript chainning functionality mongoose.run().then().catch();
// Set the useFindAndModify option to false
mongoose.set('useFindAndModify', false);

mongoose.connect(process.env.DATABASE,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("Connected to MongoDB");
    }).catch(() => {
        console.log("Could not connect to MongoDB");
    })

//app listening
const PORT = process.env.PORT || 3000;
/* This code is starting the server and listening on the specified port. When a client makes a request
to the server, it will handle the request and send a response back to the client. The console.log
statement is just printing a message to the console indicating that the server is running and
listening on the specified port. */
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
