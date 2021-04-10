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
        res.send({ profile: req.user });
    }
);

router.get("/google/failure", auth.failureMessage);

module.exports = router;
