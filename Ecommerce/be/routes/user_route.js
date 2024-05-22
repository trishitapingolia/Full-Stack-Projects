const express = require('express');
const dotenv = require('dotenv');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const protectedByAdmin = require('../middleware/protectedByAdmin');
const protectedRoute = require('../middleware/protectedResource');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const mongoose = require('mongoose');
const UserModel = mongoose.model("UserModel");
router.post('/signup', (req, res) => {
    const { Name, email, password, phoneNumber } = req.body;
    if (!Name || !password || !email || !phoneNumber) {
        return res.status(400).json({ Error: "Please fill all the mandatory fields" });
    }
    UserModel.findOne({ $or: [{ email: email }, { phoneNumber: phoneNumber }] })
        .then((userInDb) => {
            if (userInDb) {
                return res.status(500).json({ Error: "User already exists" });
            }
            bcryptjs.hash(password, 16)
                .then((hashedpassword) => {
                    const user = new UserModel({ Name, email, password: hashedpassword, phoneNumber });
                    user.save()
                        .then((newUser) => {
                            res.status(201).json({ result: "User Signed up Successfully!" });
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
        }).catch((err) => {
            console.log(err);
        });
});

router.post('/login', (req, res) => {
    const { email, password } = req.body;
    if (!password || !email) {
        return res.status(400).json({ Error: "Please fill all the mandatory fields" });
    }
    UserModel.findOne({ email: email })
        .then((userInDb) => {
            if (!userInDb) {
                return res.status(401).json({ Error: "Invalid Credentials" });
            }
            bcryptjs.compare(password, userInDb.password)
                .then((didMatch) => {
                    if (didMatch) {
                        jwtToken = jwt.sign({ _id: userInDb._id }, JWT_SECRET);
                        userInfo = { "email": userInDb.email, "Name": userInDb.Name, "_id": userInDb._id, "phoneNumber": userInDb.phoneNumber, "isAdmin":userInDb.isAdmin, "address":userInDb.address };
                        res.status(200).json({ result: { token: jwtToken, user: userInfo } });
                    } else {
                        res.status(401).json({ Error: "Invalid Credentials" });
                    }
                }).catch((err) => {
                    console.log(err);
                });
        }).catch((err) => {
            console.log(err);
        });
});

router.get('/customer/:id', protectedRoute, async (req, res) => {
    try {
        const { id } = req.params;
        const user = await UserModel.findById(id).select('-password');
        if (!user) {
            return res.status(404).json({ Error: "User not found" });
        }
        return res.status(200).json({ User: user });
    } catch (err) {
        res.status(500).json({ Error: "Internal Server Error" });
    }
})

router.get('/allcustomers', protectedByAdmin, async (req, res) => {
    try {
        const users = await UserModel.find().select('-password')
        return res.status(200).json({ Users: users });
    } catch (err) {
        res.status(500).json({ Error: "Internal Server Error" });
    }
})

router.put('/:id/editprofile', protectedRoute, async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, phoneNumber, address } = req.body;

        const updatedUser = {
            Name: Name,
            phoneNumber: phoneNumber,
            address: address
        }

        const result = await UserModel.findOneAndUpdate(
            {_id: id},
            updatedUser,
            {new: true}
        );

        res.status(200).json({user:result});
        
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

router.delete('/:id/deleteprofile', protectedByAdmin, async (req, res) => {
    try {
        const {id} = req.params;
        const result = await UserModel.findOneAndDelete(id);
        res.status(200).json({DeletedUser:result});
    } catch (err) {
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;