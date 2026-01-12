const express = require("express");
const passport = require("passport");

const router = express.Router();
const {handleUserSignUp} = require("../controllers/user");


router.post("/signup",handleUserSignUp);
// router.post("/login",handleUserLogin);
router.post(
  "/login",
  passport.authenticate("local"),
  (req, res) => {
    res.json({
      message: "Login successful",
      user: req.user,
    });
  }
);





module.exports = router;