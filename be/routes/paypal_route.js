const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const paypal = require('paypal-rest-sdk');
const protectedRoute = require('../middleware/protectedResource');

router.post('/create-payment',protectedRoute, async (req, res) => {
    const { order } = req.body;
    let totalAmount = 0;
    const items = [];
    order.products.forEach(product => {
        const item = {
            name: product.product.productName,
            sku: product.product.productName,
            price: product.product.price,
            currency: "USD",
            quantity: product.quantity
        };
        totalAmount += product.product.price * product.quantity;
        items.push(item);
    });
    var create_payment_json = {
        "intent": "sale",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://localhost:5000/success",
            "cancel_url": "http://localhost:5000/cancel"
        },
        "transactions": [{
            "item_list": {
                "items": items
            },
            "amount": {
                "currency": "USD",
                "total": totalAmount
            },
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log(payment);
            res.status(201).json({ payment: payment});
        }
    });
})
router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;
    const execute_json = {
        payer_id: payerId,
        transactions: [{
            amount: {
                currency: 'USD',
                total: '2500'
            }
        }]
    }
    paypal.payment.execute(paymentId, execute_json, (err, payment) => {
        if (err) {
            console.log(err);
            throw err;
        } else {
            console.log(JSON.stringify(payment));
            res.send("Payment Successfull")
        }
    })
})

router.get('/cancel', (req, res) => {
    res.send('Payment Cancelled')
})

module.exports = router;


