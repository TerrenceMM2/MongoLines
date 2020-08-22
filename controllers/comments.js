const Comment = require('../models/Comment');
const Article = require('../models/Article');
const moment = require('moment');
const { v4: uuidv4 } = require('uuid');

module.exports = {
    all: async (req, res) => {
        try {
            // Find all comments.
            const data = await Comment.scan().exec();
            data.forEach((obj) => {
                // Converts createAt value to an easy-to-read format.
                // In the moment() method, specifying the string to be formatted (obj.createdAt) and what the format of that string currently is (the subsequent string).
                obj.createdAt = moment(obj.createdAt, "YYYY-mm-ddTHH:MM:ssZ").format("dddd, MMMM Do, YYYY @ h:mm A");
            });
            res.json(data).status(200);
        } catch {
            res.status(500).json(err);
        }
    },
    get: async (req, res) => {
        try {
            // Find all comments for a given article.
            const articleData = await Article.get(req.params.id);
            const commentData = await Comment.batchGet(articleData.comments);
            await commentData.forEach((comment) => {
                    comment.createdAt = moment(comment.createdAt).format("dddd, MMMM Do, YYYY @ h:mm A");
            })
            res.status(200).json(commentData);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    comment: async (req, res) => {
        try {
            // Creates a new comment based on the data being based from the front-end (commentBody and commentAuthor).
            const uuid = uuidv4();
            const comment = {
                id: uuid,
                body: req.body.commentBody,
                createdBy: req.body.commentAuthor
            }
            const commentData = await Comment.create(comment);
            const articleData = await Article.update({id: req.params.id}, {"$ADD": {"comments": uuid}});
            res.json(articleData);
        } catch (err) {
            res.json(err).status(500);
        }
    },
    delete: async (req, res) => {
        // Will delete a comment based on ID.
        try {
            const data = await Comment.deleteOne(req.params.id);
            res.status(200).json(data);
        } catch (err) {
            res.json(err).status(500);
        }
    }
}