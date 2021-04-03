const dotenv = require("dotenv");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const passport = require("passport");
const session = require("express-session");

//Passport config
require("./app/middleware/passport")(passport);

//routes
const authRouter = require("./app/controllers/authController");
const userRouter = require("./app/routes/userRoutes");

const PORT = process.env.PORT || 3000;
dotenv.config();
const app = express();

//Connect to DB
const mongoose = require("mongoose");
const User = require("./app/models/User");
require("dotenv").config();

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("MONGO DB CONNECTED!");
    })
    .catch((e) => console.log("Cannot Connect to Mongo", e));

//Parse requests with "Content-Type": "application/json"
app.use(bodyParser.json());

//Parse requests with "Content-Type": "application/x-www-form-urlencoded"
app.use(bodyParser.urlencoded({ extended: true }));

//Set view engine
// EJS
app.use(expressLayouts);
app.set("view engine", "ejs");
app.set("views", "./app/views");
app.use(express.static("public"));

//Sessions
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

//Passport Setup
app.use(passport.initialize());
app.use(passport.session());

//Basic route
app.get("/", (req, res) => {
    res.send({ message: "Hack4Cause registration portal backend." });
});

app.get("/register", (req, res) => {
    res.render("index.ejs");
});

app.get("/thanks", (req, res) => {
    res.render("thanks.ejs");
});

app.use("/auth/", authRouter);
app.use("/user/", userRouter);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}.`);
});
