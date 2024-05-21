const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const tweetSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    TweetedBy: {
        type: ObjectId,
        ref: "UserModel"
    },
    likes: [
        {
            type: ObjectId,
            ref: "UserModel"
        }
    ],
    retweetedBy: [
        {   
            retweetedBy: { type: ObjectId, ref: "UserModel" }
        }
    ],
    replies: [{
        replyText:String,
        repliedBy: { type: ObjectId, ref: "UserModel" }
      }],
    image: {
        type: String,
        required: false
    },
    author: {
        type: ObjectId,
        ref: "UserModel"
    }
},{timestamps: true});

mongoose.model("TweetModel", tweetSchema);