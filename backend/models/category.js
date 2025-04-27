const mongoose = require('mongoose');

/* This code is defining a Mongoose schema for a category model. The schema has one field called `name`
which is a required string with a maximum length of 32 characters and is unique. The `timestamps`
option is set to true, which means that Mongoose will automatically manage `createdAt` and
`updatedAt` fields for each document in this collection. */
const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        unique: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Category', categorySchema);
