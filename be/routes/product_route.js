const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ProductModel = mongoose.model('ProductModel');
const protectedByAdmin = require('../middleware/protectedByAdmin');

router.post('/addproduct', protectedByAdmin, async (req, res) => {
    const { productName, price, description, image, category } = req.body;
    if (!productName || !price || !description || !image || !category) {
        return res.status(400).json({ Error: "Please fill all the mandatory fields" });
    }
    req.user.password = undefined;
    const ProductObj = new ProductModel({
        productName: productName,
        price: price,
        description: description,
        image: image,
        category: category,
        author: req.user
    });
    ProductObj.save()
        .then((newProduct) => {
            res.status(201).json({ newProduct: newProduct });
        })
        .catch((err) => {
            console.log(err);;
        });
});

router.delete('/:id/deleteproduct', protectedByAdmin, async (req, res) => {
    const { id } = req.params;
    ProductModel.findByIdAndDelete(id)
        .then((product) => {
            res.status(200).json({ deletedproduct: product });
        })
        .catch((err) => {
            console.log(err);
        });
})

router.put('/:id/updateproduct', protectedByAdmin, async (req, res) => {
    try {
        const { id } = req.params;
        const { productName, price, description, image, category } = req.body;

        const updatedProduct ={
            productName: productName,
            price: price,
            description: description,
            image: image,
            category: category
        };
        const result = await ProductModel.findOneAndUpdate(
            {_id: id},
            updatedProduct,
            {new: true}
        );
        res.status(200).json({ updatedProduct: result });
    } catch (err) {
        res.status(500).json({ err: err });
    }
});

router.get('/allproducts', async(req, res) => {
    try {
        const products = await ProductModel.find();
        res.status(200).json({ products: products });
    } catch (err) {
        res.status(500).json({ err: err});
    }
});

router.get('/products/:id',async(req, res) => {
    try {
        const { id } = req.params;
        const product = await ProductModel.findById(id);
        res.status(200).json({ product: product });
    } catch (err) {
        res.status(500).json({ err: err });
    }
});

module.exports = router;

