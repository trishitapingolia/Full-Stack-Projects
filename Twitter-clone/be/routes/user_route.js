const express = require('express');
const router = express.Router();
const protectedRoute = require('../middleware/protectedResource');

const mongoose = require('mongoose');
const UserModel = mongoose.model("UserModel");

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        // Exclude password from the response
        const user = await UserModel.findById(id).select('-password');
        if (!user) {
            // If user not found, return 404 error
            return res.status(404).json({ error: 'User not found' });
        }
        // If user found, send the user details in the response
        res.status(200).json({ result: user });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id/profilepicture', protectedRoute, async (req, res) => {
    try {
        const { profilePicture } = req.body;
        const id = req.params.id;
        if (!profilePicture) {
            return res.status(400).json({ Error: "Please upload a profile picture!" });
        }
        const updatedprofile = {
            profilePicture
        };
        const result = await UserModel.findOneAndUpdate(
            { _id: id },
            updatedprofile,
            { new: true }
        );
        return res.status(200).json({ userprofilePicture: result });
    } catch (error) {
        console.error(error); 
        return res.status(500).json({ error: 'Internal server error' });
    }
})

router.put('/:id', protectedRoute, async (req, res) => {
    try {
        // Extract updated user details from request body
        const { name, location, dateOfBirth } = req.body;
        const id = req.params.id;
        // Create an object containing the updated user details
        const updatedUser = {
            name,
            location,
            dateOfBirth
        };

        // Update the user document in the database except for email, password, followers, and following
        const result = await UserModel.findOneAndUpdate(
            { _id: id }, // Find the user by their ObjectId
            updatedUser, // Set the updated user details
            { new: true } // Return the updated document
        );

        // Return the updated user document as the response
        res.status(200).json({ user: result });
    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id/follow', protectedRoute, async (req, res) => {
    try {
        // Extract user IDs of follower (user A) and followed (user B)
        const followedId = req.params.id;
        const followerId = req.user._id;

        // Update the followers list of user B and the following list of user A
        const updatedFollower = UserModel.findByIdAndUpdate(
            followedId,
            { $push: { followers: followerId } }, // Add followerId to followers list of followedId
            { new: true } // Return updated document
        ).exec()

        const updatedFollowing = UserModel.findByIdAndUpdate(
            followerId,
            { $push: { following: followedId } }, // Add followedId to following list of followerId
            { new: true } // Return updated document
        ).exec()

        const [NewFollower, NewFollowing] = await Promise.all([updatedFollower, updatedFollowing]);

        // Send the response with updated follower and following information
        res.status(200).json({ NewFollower, NewFollowing });

    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.put('/:id/unfollow', protectedRoute, async (req, res) => {
    try {
        // Extract user IDs of follower (user A) and followed (user B)
        const unfollowedId = req.params.id;
        const unfollowerId = req.user._id;

        // Update the followers list of user B and the following list of user A
        const updatedFollower = UserModel.findByIdAndUpdate(
            unfollowedId,
            { $pull: { followers: unfollowerId } }, // Add followerId to followers list of followedId
            { new: true } // Return updated document
        ).exec()

        const updatedFollowing = UserModel.findByIdAndUpdate(
            unfollowerId,
            { $pull: { following: unfollowedId } }, // Add followedId to following list of followerId
            { new: true } // Return updated document
        ).exec()

        const [NewFollower, NewFollowing] = await Promise.all([updatedFollower, updatedFollowing]);

        // Send the response with updated follower and following information
        res.status(200).json({ NewFollower, NewFollowing });

    } catch (err) {
        // Handle errors
        console.error(err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;