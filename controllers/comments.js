var comment = require('../models/comment');
var article = require('../models/article');
var moment = require('moment');

module.exports = {
    all: function (req, res) {
        comment.find({}).lean().then(function (data) {
            data.forEach((obj) => {
                obj.createdAt = moment(obj.createdAt, "YYYY-mm-ddTHH:MM:ssZ").format("dddd, MMMM Do, YYYY @ h:mm A");
            });
            res.json(data).status(200);
        }).catch(function (err) {
            res.status(500).json(err);
        })
    },
    get: function (req, res) {
        // Find all comments for a given article.
        // Source: https://stackoverflow.com/questions/8303900/mongodb-mongoose-findmany-find-all-documents-with-ids-listed-in-array
        article.findById(req.params.id).then(function (data) {
            Comment.find({"_id": {
                $in: data.comments
            }}).lean().then(function(results) {
                results.forEach((obj) => {
                    obj.createdAt = moment(obj.createdAt, "YYYY-mm-ddTHH:MM:ssZ").format("dddd, MMMM Do, YYYY @ h:mm A");
                });
                res.status(200).json(results);
            })
        }).catch(function (err) {
            res.status(500).json(err);
        });
    },
    comment: function (req, res) {
        comment.create({
            body: req.body.commentBody,
            createdBy: req.body.commentAuthor
        }).then(function (commentData) {
            return Article.findByIdAndUpdate(req.params.id, {
                $push: {
                    comments: commentData.id
                }
            }, {
                new: true
            });
        }).then(function (articleData) {
            res.json(articleData);
        }).catch(function (err) {
            res.json(err).status(500);
        })
    },
    delete: function (req, res) {
        comment.deleteOne({
                _id : req.params.id
        }).then(function (data) {
            res.status(200).json(data);
        })
        .catch(function (err) {
            console.log(err);
            res.json(err).status(500);
        });
    }
}