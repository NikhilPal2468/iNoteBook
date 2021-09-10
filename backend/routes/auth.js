const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");
var fetchuser = require("../middleware/fetchuser.js");
const JWT_SECRET = "Nikhilisagoodboy";
// Route 1: Create a user using : POST "/api/auth/createUser" Login not required
router.post(
    "/createUser",
    [
        body("email", "Enter a valid email").isEmail(),
        body("name", "Enter a valid name").isLength({ min: 3 }),
        body("password", "PassWord must be of 5 characters").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        let success = false;
        // If thre are errors, return Bad requests and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }
        // Check whether user with this email  exists already
        try {
            let users = await User.findOne({ email: req.body.email });
            if (users) {
                return res.status(400).json({
                    success,
                    error: "You have already registered with this email Please login!",
                });
            }

            const salt = await bcrypt.genSalt(10);
            const secPass = await bcrypt.hash(req.body.password, salt);
            // Create a new User
            users = await User.create({
                name: req.body.name,
                password: secPass,
                email: req.body.email,
            });

            const data = {
                user: {
                    id: users.id,
                },
            };
            const authToken = jwt.sign(data, JWT_SECRET);
            success = true;
            console.log(authToken);
            //   res.json(users);
            res.json({success, authToken });
            // .then(user => res.json(user))
            // .catch(err=>{console.log(err)
            // res.json({error: 'Please enter a unique value for email', message: err.message})})
        } catch (error) {
            console.error(error.message);
            res.status(500).send({success,  error:"Internal server error"});
        }
    }
);

// Route 2: Authenticate a user using : POST "/api/auth/login" Login not required
router.post(
    "/login",
    [
        body("email", "Enter a valid email").isEmail(),
        body("password", "Password cannot be blank").exists(),
    ],
    async (req, res) => {
        let success = false
        // If thre are errors, return Bad requests and errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }
        const { email, password } = req.body;
        try {
            let user = await User.findOne({email});
            if(!user){
                return res.status(400).json({success, error:"Please try to login with correct credentials"});
            }
            const passwordCompare = await bcrypt.compare(password, user.password);
            if(!passwordCompare){
                return res.status(400).json({success, error:"Please try to login with correct credentials"});
            }

            const data = {
                user:{
                    id:user.id
                }
            }
            const authToken = jwt.sign(data, JWT_SECRET)
            success = true;
            res.json({success, authToken})
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    }
);
// Route 3: Logged in user details using : POST "/api/auth/getuser" . Login required
router.post("/getuser",fetchuser , async (req, res) => {
        try {
            userId = req.user.id;
            const user = await User.findById(userId).select("-password")
            res.send(user);
        } catch (error) {
            console.error(error.message);
            res.status(500).send("Internal server error");
        }
    }
);


module.exports = router;
