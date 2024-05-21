const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const TweetModel = mongoose.model('TweetModel');
const protectedRoute = require('../middleware/protectedResource');

router.get('/', async (req, res) => {
    try {
        const tweets = await TweetModel.find()
            .populate('author', '_id name followers following profilePicture createdAt')
            .populate('replies.repliedBy', '_id name')
            .sort({createdAt: -1});

        res.status(200).json({ tweets: tweets });
    }
    catch (err) {
        console.log(err);
    };
})

router.get('/:id/tweets', protectedRoute, async (req, res) => {
    const id = req.params.id;
    try {
        const tweets = await TweetModel.find({ author: id })
            .populate('author', '_id name followers following profilePicture createdAt')
            .sort({ createdAt: -1 });

        res.status(200).json({ tweets: tweets });
    } catch (err) {
        console.log(err);
    };
})

router.delete('/deletetweet/:id', protectedRoute, async (req, res) => {
    try {
        const tweetFound = await TweetModel.findOne({ _id: req.params.id })
            .populate('author', '_id')
        if (!tweetFound) {
            return res.status(404).json({ Error: "Tweet not found" });
        }

        if (tweetFound.author._id.toString() === req.user._id.toString()) {
            await tweetFound.deleteOne();
            return res.status(200).json({ result: "Tweet deleted successfully" });
        } else {
            return res.status(403).json({ Error: "You don't have permission to delete this Tweet" });
        }
    } catch (err) {
        console.log(err);
        return res.status(500).json({ err: "Internal server error" });
    }
});
router.post('/', protectedRoute, (req, res) => {
    const { content, image } = req.body;
    if (!content) {
        return res.status(400).json({ Error: "Please fill all the mandatory fields" });
    }
    req.user.password = undefined;
    const tweetObj = new TweetModel({
        content: content,
        image: image,
        TweetedBy: req.user._id,
        author: req.user
    });
    tweetObj.save()
        .then((newTweet) => {
            res.status(201).json({ Tweet: newTweet });
        })
        .catch((err) => {
            console.log(err);;
        });
});

router.get('/:id', protectedRoute, async (req, res) => {
    const id = req.params.id;
    await TweetModel.findById(id)
        .populate('author', '_id name email dateOfBirth username followers following')
        .then((tweet) => {
            res.status(200).json({ tweet: tweet });
        })
        .catch((err) => {
            console.log(err);
        });

});

router.put("/:id/like", protectedRoute, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await TweetModel.findByIdAndUpdate(req.body.tweetId, {
            $push: { likes: id }
        }, {
            new: true //returns updated record
        }).populate("author", "_id name").exec()
            .then((likedTweet) => {
                res.status(200).json({ likedTweet: likedTweet });
            })
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

router.put("/:id/dislike", protectedRoute, async (req, res) => {
    try {
        const id = req.params.id;
        const result = await TweetModel.findByIdAndUpdate(req.body.tweetId, {
            $pull: { likes: id }
        }, {
            new: true //returns updated record
        }).populate("author", "_id fullName").exec()
            .then((unlikedTweet) => {
                res.status(200).json({ unlikedTweet: unlikedTweet });
            })
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
});

router.put("/:id/reply", protectedRoute, async (req, res) => {
    try {
        const id = req.params.id;
        const reply = { replyText: req.body.replyText, repliedBy: id }
        await TweetModel.findByIdAndUpdate(req.body.tweetId, {
            $push: { replies: reply }
        }, {
            new: true
        }).populate("replies.repliedBy", "_id name") //reply owner
            .populate("author", "_id name") //Tweet owner
            .exec()
            .then((repliedTweet) => {
                res.status(200).json({ repliedTweet: repliedTweet });
            })
    } catch (err) {
        return res.status(400).json({ err: err })
    }
})

router.put("/:id/retweet", protectedRoute, async (req, res) => {
    try {
        const id = req.params.id;
        const retweet = { retweetedBy: id }
        await TweetModel.findByIdAndUpdate(req.body.tweetId, {
            $push: { retweetedBy: retweet }
        }, {
            new: true //returns updated record
        }).populate("retweetedBy.retweetedBy", "_id name")
            .populate("author", "_id name").exec()
            .then((reTweeted) => {
                res.status(200).json({ reTweeted: reTweeted });
            })
    } catch (err) {
        res.status(400).json({ err: err.message });
    }
})


module.exports = router;