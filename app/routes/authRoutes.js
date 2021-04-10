const express = require("express");
const router = express.Router();
const passport = require("passport");

const auth = require("../controllers/authController");

router.get("/google", auth.googleAuth);

router.get("/google/callback", auth.googleCallback);

router.get(
    "/google/success",
    passport.authenticate("google", { failureRedirect: "/auth/google/failure" }),
    (req, res) => {
        res.render("thanks.ejs");
    }
);

router.get("/google/failure", auth.failureMessage);

module.exports = router;
