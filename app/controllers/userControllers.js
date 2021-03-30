const passport = require('passport');
const User = require('../models/User')

exports.getUsers = async (req, res) => {
    const allUsers  = await User.find({});

    res.status(200).send(allUsers);
}