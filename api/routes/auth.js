const router = require("express").Router();
const UserSchema = require("../models/User");
const brcrypt = require("bcrypt");

// Register 
router.post("/register", async (req, res) => {


     try {
          const salt = await brcrypt.genSalt(10);
          const hashPassword = await brcrypt.hash(req.body.password, salt)

          const newUser = new UserSchema({
               username: req.body.username,
               email: req.body.email,
               password: hashPassword
          });

          const user = await newUser.save();

          res.status(200).json(user);

     } catch (err) {
          console.log(err);
     }
});

// Login
router.post("/login", async (req, res) => {

     try {
          const user = await UserSchema.findOne({ email: req.body.email });
          !user && res.status(404).json("User not found");

          const validPassword = await brcrypt.compare(req.body.password, user.password);
          !validPassword && res.status(400).json("Wrong password")

          res.status(200).json(user);

     } catch (err) {
          console.log(err);
     }

});


module.exports = router;