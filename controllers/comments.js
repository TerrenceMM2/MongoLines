var Comment = require('../models/Comment');
var Article = require('../models/Article');
var cheerio = require("cheerio");
var axios = require("axios");

module.exports = {
    get: function (req, res) {
        Comment.find({}).then(function (data) {
            res.json(data).status(200);
            // res.render("comment", {
            //     data
            // });
        }).catch(function (err) {
            res.status(500).json(err);
        })
    },
    comment: function (req, res) {
        Comment.create({
            body: req.body.body,
            createdBy: req.body.createdBy
        }).then(function (commentData){
            return Article.findByIdAndUpdate(req.params.id, {$push: { comments: commentData.id }}, { new: true });
        }).then(function (articleData) {
            res.json(articleData);
        }).catch(function (err) {
            res.json(err).status(500);
        })
    },
    delete: function (req, res) {

    }
}