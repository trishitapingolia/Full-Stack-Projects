const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const {JWT_SECRET}= require('../config');

const mongoose = require('mongoose');
const UserModel = mongoose.model("UserModel");
router.post('/signup', (req, res)=>{
    const {fullName, email, password,username, profilePicture} = req.body;
    if(!fullName || !password || !email ||!username){
        return res.status(400).json({Error: "Please fill all the mandatory fields"});
    }
    UserModel.findOne({ $or: [{ email: email }, { username: username }] })
    .then((userInDb)=>{
        if(userInDb){
            return res.status(500).json({Error: "User already exists"});
        }
        bcryptjs.hash(password,16)
        .then((hashedpassword)=>{
            const user = new UserModel({fullName, email, password:hashedpassword,username, profilePicture});
            user.save()
            .then((newUser)=>{
                res.status(201).json({result:"User Signed up Successfully!"});
            })
            .catch((err)=>{
                console.log(err);
            });
        })
    }).catch((err)=>{
        console.log(err);
    });
});

router.post('/login', (req, res)=>{
    const {email, password} = req.body;
    if(!password || !email){
        return res.status(400).json({Error: "Please fill all the mandatory fields"});
    }
    UserModel.findOne({email:email})
    .then((userInDb)=>{
        if(!userInDb){
            return res.status(401).json({Error: "Invalid Credentials"});
        }
        bcryptjs.compare(password,userInDb.password)
        .then((didMatch)=>{
            if(didMatch){
                jwtToken = jwt.sign({_id:userInDb._id},JWT_SECRET);
                userInfo ={"email":userInDb.email, "fullname":userInDb.fullName , "_id":userInDb._id, "username":userInDb.username};
                res.status(200).json({result:{token:jwtToken,user:userInfo}});
            }else{
                res.status(401).json({Error: "Invalid Credentials"});
            }
        }).catch((err)=>{
            console.log(err);
        });
    }).catch((err)=>{
        console.log(err);
    }); 
});

module.exports = router;