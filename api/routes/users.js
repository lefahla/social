const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

//update User
router.put("/:id", async (req, res) => {
     if (req.body.userId === req.params.id || req.body.isAdmin) {
          if (req.body.password) {
               try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt)
               } catch (err) {
                    return res.status(500).json("Internal server erro :: " + err);
               }
          }
          try {
               const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
               });

               res.status(200).json("Account updated");
          } catch (err) {
               return res.status(500).json("Internal server error :: " + err)
          }

     } else {
          return res.status(403).json("You can only update your account");
     }

});


//delete user
router.delete("/:id", async (req, res) => {
     if (req.body.userId === req.params.id || req.body.isAdmin) {

          try {
               await User.findByIdAndDelete(req.params.id);
               res.status(200).json("Account has been deleted");
          } catch (err) {
               return res.status(500).json(err)
          }
     } else {
          return res.status(403).json("You can only update your account");
     }

});

//get a user
router.get("/", async (req, res) => {
     const reqUserId = req.query.userId
     const reqUsername = req.query.username
     try {
          const searchUser =  reqUsername ?  await User.findOne({ username: reqUsername }) : await User.findById(reqUserId) ;
          const { password, updatedAt, ...other } = searchUser._doc;
          res.status(200).json(other);
     } catch (error) {
          res.status(500).json("Internal server error : " + error);
     }
});

// Follow a user                  
router.put("/:id/follow", async (req, res) => {
     if (req.body.userId !== req.params.id) {
          try {
               const user = await User.findById(req.params.id);
               const currrentUser = await User.findById(req.body.userId);

               if (!user.followers.includes(req.body.userId)) {
                    await user.updateOne({ $push: { followers: req.body.userId } });
                    await currrentUser.updateOne({ $push: { followings: req.params.id } });

                    res.status(200).json("User has been followed");
               } else {
                    res.status(403).json("You are already following this user");
               }

          } catch (err) {

               res.status(500).json("Internal server erro :: " + err);
          }
     } else {
          res.status(403).json("You cant follow youself");
     }
});

//unfollow a user
router.put("/:id/unfollow", async (req, res) => {
     if (req.body.userId !== req.params.id) {
          try {

               const user = await User.findById(req.params.id);
               const currrentUser = await User.findById(req.body.userId);

               if (user.followers.includes(req.body.userId)) {
                    await user.updateOne({ $pull: { followers: req.body.userId } });
                    await currrentUser.updateOne({ $pull: { followings: req.body.userId } });

                    res.status(200).json("User has been unfollowed");
               } else {
                    res.status(403).json("You dnt follow this user");
               }

          } catch (err) {
               res.status(500).json("Internal server erro :: " + err);
          }
     } else {
          res.status(403).json("You cant unfollow youself");
     }
});

//get all users

module.exports = router;