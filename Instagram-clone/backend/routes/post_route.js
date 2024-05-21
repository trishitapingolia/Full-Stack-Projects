const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const PostModel = mongoose.model('PostModel');
const protectedRoute = require('../middleware/protectedResource');

router.get('/allposts', (req, res) => {
    PostModel.find()
        .populate('author', '_id fullName profilePicture')
        .populate('comments.commentBy', '_id fullName')

        .then((posts) => {
            res.status(200).json({ posts: posts });
        })
        .catch((err) => {
            console.log(err);
        });
})

router.get('/myallposts', protectedRoute, (req, res) => {
    PostModel.find({ author: req.user._id })
        .populate('author', '_id fullName profilePicture')
        .then((posts) => {
            res.status(200).json({ posts: posts });
        })
        .catch((err) => {
            console.log(err);
        });
})

router.delete('/deletepost/:postId', protectedRoute, async (req, res) => {
    try {
        const postFound = await PostModel.findOne({ _id: req.params.postId })
            .populate('author', '_id')
        if (!postFound) {
            return res.status(404).json({ Error: "Post not found" });
        }

        if (postFound.author._id.toString() === req.user._id.toString()) {
            await postFound.deleteOne();
            return res.status(200).json({ result: "Post deleted successfully" });
        } else {
            return res.status(403).json({ Error: "You don't have permission to delete this post" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "Internal server error" });
    }
    // PostModel.findOne({_id:req.params.postId})
    // .populate('author','_id')
    // .exec((err,postFound)=>{
    //     if(err||!postFound){
    //         return res.status(404).json({Error: "Post not found"});
    //     }
    //     if(postFound.author._id.toString()=== req.user._id.toString()){
    //         postFound.remove()
    //        .then((postRemoved)=>{
    //          res.status(200).json({result:postRemoved});
    //        })
    //        .catch((err)=>{
    //             console.log(err);
    //         });
    //     };
    // });
});
router.post('/createpost', protectedRoute, (req, res) => {
    const { description, location, image } = req.body;
    if (!description || !location || !image) {
        return res.status(400).json({ Error: "Please fill all the mandatory fields" });
    }
    req.user.password = undefined;
    const postObj = new PostModel({
        description: description,
        location: location,
        image: image,
        author: req.user
    });
    postObj.save()
        .then((newPost) => {
            res.status(201).json({ post: newPost });
        })
        .catch((err) => {
            console.log(err);
        });
});

router.put("/like", protectedRoute, async (req, res) => {
    try {
        const result = PostModel.findByIdAndUpdate(req.body.postId, {
            $push: { likes: req.user._id }
        }, {
            new: true //returns updated record
        }).populate("author", "_id fullName").exec()
        .then((likedPost)=>{
            res.status(200).json({likedPost:likedPost});
        })
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

router.put("/unlike", protectedRoute, async (req, res) => {
    try {
        const result = PostModel.findByIdAndUpdate(req.body.postId, {
            $pull: { likes: req.user._id }
        }, {
            new: true //returns updated record
        }).populate("author", "_id fullName").exec()
        .then((unlikedPost)=>{
            res.status(200).json({unlikedPost:unlikedPost});
        })
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

router.put("/comment", protectedRoute, async (req, res) => {
    try {
        const comment = {commentText: req.body.commentText, commentBy:req.user._id}
        await PostModel.findByIdAndUpdate(req.body.postId, {
            $push: { comments: comment }
        },{
            new: true
        }).populate("comments.commentBy", "_id fullName") //comment owner
        .populate("author","_id fullName") //post owner
        .exec()
        .then((uncommentedPost)=>{
            res.status(200).json({uncommentedPost:uncommentedPost});
        })
    } catch (err) {
        return res.status(400).json({err:err})
    }
})

router.put("/uncomment", protectedRoute, async (req, res) => {
    try {
        const comment = {commentText: req.body.commentText, commentBy:req.user._id}
        await PostModel.findByIdAndUpdate(req.body.postId, {
            $pull: { comments: comment }
        },{
            new: true
        }).populate("comments.commentBy", "_id fullName") //comment owner
        .populate("author","_id fullName") //post owner
        .exec()
        .then((commentedPost)=>{
            res.status(200).json({commentedPost:commentedPost});
        })
    } catch (err) {
        return res.status(400).json({err:err})
    }
})
module.exports = router;