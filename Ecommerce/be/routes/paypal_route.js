const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const OrderModel = mongoose.model('OrderModel');
const ProductModel = mongoose.model('ProductModel');
const protectedRoute = require('../middleware/protectedResource');
const paypal = require('paypal-rest-sdk');

router.post('/create-payment', protectedRoute, async (req, res) => {
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
            "order_id": order._id,
            "description": "This is the payment description."
        }]
    };

    paypal.payment.create(create_payment_json, function (error, payment) {
        if (error) {
            throw error;
        } else {
            console.log(payment);
            res.status(201).json({ payment: payment });
        }
    });
})
router.get('/success', (req, res) => {
    const payerId = req.query.PayerID;
    const paymentId = req.query.paymentId;

    // Fetch the payment details from PayPal
    paypal.payment.get(paymentId, function (error, payment) {
        if (error) {
            console.error(error);
            return res.status(500).send('Error fetching payment details from PayPal');
        }

        // Extract total amount from the payment details
        const totalAmount = payment.transactions[0].amount.total;

        // Prepare JSON for executing the payment
        const execute_json = {
            payer_id: payerId,
            transactions: [{
                amount: {
                    currency: 'USD',
                    total: totalAmount
                }
            }]
        };



        // Execute the payment
        paypal.payment.execute(paymentId, execute_json, (err, payment) => {
            if (err) {
                console.error(err);
                return res.status(500).send('Error executing payment');
            } else {
                console.log(JSON.stringify(payment));
                res.send("Payment Successful");
            }
        });
    });
});

router.get('/cancel', (req, res) => {
    res.send('Payment Cancelled')
})

module.exports = router;


