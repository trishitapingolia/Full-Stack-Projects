const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    address:{
        type: String,
        default : ''
    },
    isAdmin:{
        type: Boolean,
        default: false
    }
});

mongoose.model("UserModel",userSchema);