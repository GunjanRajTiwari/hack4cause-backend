require("dotenv").config();

const express = require("express");
const router = express.Router();
const passport = require("passport");

const User = require("../models/User");

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get(
    "/google/callback",
    passport.authenticate("google", { failureRedirect: "/" }),
    (req, res) => {
        res.redirect("/thanks");
    }
);

// router.get("/authDone", (req, res) => {
//     res.render("thanks.ejs");
// });

module.exports = router;
