require('dotenv').config();

const express = require('express');
const router = express.Router();
const passport = require('passport');

const User = require('../models/User')
  
router.get("/google",
  passport.authenticate('google', { scope: ["profile", "email"] })
);

router.get('/google/callback', 
passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/auth/authDone');
});

router.get('/authDone', (req, res) => {
    console.log({"qeqweeqwe": req.user});
  res.send(req.user);
})
  
  module.exports = router;