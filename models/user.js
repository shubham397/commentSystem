const mongoose = require('mongoose');

var User = mongoose.Schema(
    {
        name: { type: String },
        email:
        {
            type: String,
            required: true,
            unique: true
        },
        password: { type: String },
    }
);


let user = module.exports = mongoose.model('user', User);