var Article = require('../models/Article');

module.exports = {
    get: (req, res) => {
        res.render("index", { data: "You've searched for articles." });
    }
};