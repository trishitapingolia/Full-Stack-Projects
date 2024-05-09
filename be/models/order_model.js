const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const OrderSchema = new mongoose.Schema({
    amount:{
        type: Number,
        required: true
    },
    products:[
        {product:{
            type: ObjectId,
            ref: "ProductModel"}, 
        quantity:{
            type: Number,
            default:1}
        }
    ],
    status:{
        type: String,
        required: true
    },
    author: {
        type: ObjectId,
        ref: "UserModel"
    }
});

mongoose.model("OrderModel",OrderSchema);