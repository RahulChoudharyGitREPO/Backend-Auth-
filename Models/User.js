const Joi = require("joi");
const mongoose = require("mongoose");

//User.js
const { Schema } = mongoose;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
});

// Export the model (if needed)
const User = mongoose.model('User', UserSchema);

module.exports = User;
