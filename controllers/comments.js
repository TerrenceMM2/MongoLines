var Comment = require('../models/Comment');

module.exports = {
    get: (req, res) => {
        res.render("index", { data: "You've searched for comments." });
    }
};