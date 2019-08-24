var Article = require('../models/Article');

module.exports = {
    get: (req, res) => {
        res.send("You've search for articles");
    }
};