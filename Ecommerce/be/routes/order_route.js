const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const OrderModel = mongoose.model('OrderModel');
const ProductModel = mongoose.model('ProductModel');
const protectedRoute = require('../middleware/protectedResource');
const protectedByAdmin = require('../middleware/protectedByAdmin');

router.get('/myallorders', protectedRoute, (req, res) => {
    OrderModel.find({ author: req.user._id })
        .populate('author', '_id Name phoneNumber')
        .then((orders) => {
            res.status(200).json({ orders: orders });
        })
        .catch((err) => {
            console.log(err);
        });
})

router.get('/orders/:id', protectedRoute, async(req, res) => {
    try {
        const id = req.params.id;
        const order = await OrderModel.findById(id)
            .populate('author', 'Name Email phoneNumber')
            .populate({
                path: 'products',
                select: 'productName price quantity', // Specify the fields you want to select
                populate: { path: 'product', select: 'productName price' } // Populate the product field
            });

        res.status(200).json({ order: order });
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
})

router.get('/allorders', protectedByAdmin, async(req, res) => {
    try {
        const orders = await OrderModel.find()
            .populate('author', 'Name Email phoneNumber')
            .populate('products', 'productName price');
            
        res.status(200).json({ orders: orders });
        
    } catch (err) {
        res.status(500).json({ err: err.message });
    }
});

router.post('/addorder', protectedRoute, async (req, res) => {
    const { amount, products, status } = req.body;
    if (!amount || !products || !status ) {
        return res.status(400).json({ Error: "Please fill all the mandatory fields" });
    }
    req.user.password = undefined;

    const productDetails = await Promise.all(products.map(async product => {
        const { productId, quantity } = product;
        const productInfo = await ProductModel.findById(productId);
        return { product: productInfo, quantity };
    }));

    const orderObj = new OrderModel({
        amount: amount,
        products: productDetails,
        status: status,
        author: req.user
    });
    orderObj.save()
        .then((newOrder) => {
            res.status(201).json({ newOrder: newOrder });
        })
        .catch((err) => {
            console.log(err);;
        });
});

module.exports = router;


