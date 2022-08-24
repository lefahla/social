const router = require("express").Router();
const { json } = require("body-parser");
const Post = require("../models/Post");
const User = require("../models/User");

// Create a post
router.post("/", async (req, res) => {

    const newPost = new Post(req.body);

    try {
        const savePost = await newPost.save();
        res.status(200).json(savePost);
    } catch (err) {
        res.status(500).json("Internal server error :: " + err)
    }

});

// Update a post
router.put("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        if (post.userId === req.body.userId) {
            await post.updateOne({ $set: req.body });
            res.status(200).json("Post has been updated");
        } else {
            res.status(403).json("Your can only update your post");
        }
    } catch (err) {
        console.log(err)
        res.status(500).json("Internal server error :: " + err);
    }

});

// delete a post
router.delete("/:id", async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);

        if (post.userId === req.body.userId) {
            await post.deleteOne();
            res.status(200).json("Post has benn delete");
        } else {
            res.status(403).json("Your can only delete your post");
        }
    } catch (err) {
        console.log(err)
        res.status(500).json("Internal server error :: " + err);
    }
});

// Lke or dislike a post
router.put("/:id/like", async (req, res) => {
    try {

        const post = await Post.findById(req.params.id);
        if (!post.likes.includes(req.body.userId)) {
            await post.updateOne({ $push: { likes: req.body.userId } });
            res.status(200).json("Post has been liked");
        } else {
            await post.updateOne({ $pull: { likes: req.body.userId } });
            res.status(200).json("Post has been disliked");
        }

    } catch (err) {
        res.status(500).json("Internal Error :: " + err)
    }

});

// Get a post
router.get("/:id", async (req, res) => {
    try {
        const post = await Post.findById(req.params.id);
        res.status(200).json(post);


    } catch (err) {
        res.status(500).json("Internal Error :: " + err)
    }

})

// Get timelime posts 
router.get("/timeline/:userId", async (req, res) => {

    try {
        const currentUser = await User.findById(req.params.userId);
        if (currentUser) {
            console.log(currentUser);
            const userPosts = await Post.find({ userId: currentUser._id });
            const friendPosts = await Promise.all(
                currentUser.followings.map((friendId) => {
                    return Post.find({ userId: friendId });
                })
            );
            res.status(200).json(userPosts.concat(...friendPosts));
        } else {
            res.status(404).json("The user with id : " + req.body.userId + " does not exit");
        }
    } catch (err) {
        res.status(500).json("Internal Error :: " + err);
    }
});


// Get user's all posts 
router.get("/profile/:username", async (req, res) => {

    try {
        const findUser = await User.findOne({ username: req.params.username })
 
        if (findUser) { 
            const posts = await Post.find({ userId: findUser._id });

            if (posts) {
                res.status(200).json(posts);
                console.log(posts);
            } else { 
                res.status(200).json("User does not have any posts yet");
            }
        } else {
            res.status(404).json("The user does not exists");
        }
    } catch (err) {
        res.status(500).json("Internal Error :: " + err);
    }
});

module.exports = router;