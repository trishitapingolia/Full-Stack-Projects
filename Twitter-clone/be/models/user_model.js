const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    username:{
        type: String,
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
    location:{
        type: String,
        required: false
    },
    profilePicture:{
        type: String,
        default:"https://img.playbook.com/aoNI_L5WBDTL2VLzrVtS8sOLulG8ojvEpIcFdSfCnO0/Z3M6Ly9wbGF5Ym9v/ay1hc3NldHMtcHVi/bGljL2Q2MDMzYmM3/LTBlMzgtNDViMS04/ODc0LTFlMmQxYTMy/YzIwNw"
    },
    dateOfBirth:{
        type: Date,
        required: false
    },
    followers: [
        {
            type: ObjectId,
            ref: "UserModel"
        }
    ],
    following:[
        {
            type: ObjectId,
            ref: "UserModel"
        }
    ],
},{timestamps: true});

mongoose.model("UserModel",userSchema);