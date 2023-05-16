// import mongoose to build the model 
const mongoose = require('mongoose');

// the model - the rules the entries need to follow
const AuthorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required"],
        minlength: [3, "Name must be atleast 3 characters long!"]
    }
}, {timestamps: true})

const Author = mongoose.model('Author', AuthorSchema);

module.exports = Author