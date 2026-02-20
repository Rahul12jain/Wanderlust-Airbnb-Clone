const express= require("express");
const router = express.Router();
const User = require("../models/user"); // Ensure you require the User model
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/users.js");


// here we use router.route concept of express to combine same route path

router.route("/signup")
.get( (userController.renderSignupForm))
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderSigninForm)
.post(saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect:"/login",
        failureFlash:true,
    }),
    userController.login
);

router.get("/logout", userController.logout);


//For Signup
// router.get("/signup",(userController.renderSignupForm));

// router.post("/signup" ,
//     wrapAsync(userController.signup)
// );


//For Login
// router.get("/login", userController.renderSigninForm);

// router.post("/login",saveRedirectUrl,
//     passport.authenticate("local",{
//         failureRedirect:"/login",
//         failureFlash:true,
//     }),
//     userController.login
// );

 





module.exports = router;