const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");

const User = require("../models/User");

module.exports = function (passport) {
    passport.use(
        new GoogleStrategy(
            {
                clientID: process.env.GOOGLE_CLIENT_ID,
                clientSecret: process.env.GOOGLE_CLIENT_SECRET,
                callbackURL: process.env.CALLBACK_URL,
            },

            async (accessToken, refreshToken, profile, done) => {
                // console.log(profile);
                const newUser = {
                    googleID: profile.id,
                    displayName: profile.displayName,
                    firstName: profile.givenName,
                    lastName: profile.familyName,
                    image: profile.photos[0].value,
                    email: profile.emails[0].value,
                };

                try {
                    let user = await User.findOne({ googleID: profile.id });

                    if (user) {
                        done(null, user);
                    } else {
                        user = await User.create(newUser);
                        done(null, newUser);
                    }
                } catch (error) {
                    console.error(error);
                }
            }
        )
    );

    passport.serializeUser(function (user, done) {
        done(null, user);
    });

    passport.deserializeUser(function (user, done) {
        done(null, user);
    });
};
