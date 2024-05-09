const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const ProductSchema = new mongoose.Schema({
    productName:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    description:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    category:{
        type: String,
        required: true
    }
});

mongoose.model("ProductModel",ProductSchema);