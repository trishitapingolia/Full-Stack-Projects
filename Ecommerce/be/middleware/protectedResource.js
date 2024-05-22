const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;

const mongoose = require('mongoose');
const UserModel =mongoose.model('UserModel');

module.exports=(req,res,next)=>{
    //Bearer nknswlnfcldsn
    const {authorization} =req.headers;
    if(!authorization){
        return res.status(401).json({Error: "User not logged in!"});
    }
    const token = authorization.replace("Bearer ","");
    jwt.verify(token,JWT_SECRET,(err,payload)=>{
        if(err){
            return res.status(401).json({Error: "User not logged in!"});
        }
        const {_id}= payload;
        UserModel.findById(_id)
        .then((dbuser)=>{
             req.user = dbuser;
             next();//goes to next middleware or Rest API
         })
    });
}