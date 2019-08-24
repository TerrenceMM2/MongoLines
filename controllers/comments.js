var Comment = require('../models/Comment');

module.exports = {
    get: (req, res) => {
        res.send("You've search for comments");
    }
};