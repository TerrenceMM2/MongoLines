var express = require("express");
var router = express.Router();

var commentController = require("../controllers/comments");

router.get('/', function(req, res) {
    Comment.find({}).then(function (data) {
        res.render("index", {
            data
        });
    }).catch(function (err) {
        res.status(500).json(err);
    })
});

module.exports = router;