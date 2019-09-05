var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var CommentSchema = new Schema ({
    body: String,
    createdBy: String,
    createdAt: { type: Date, default: Date.now },
});

var comment = mongoose.model("comment", CommentSchema);

module.exports = comment;