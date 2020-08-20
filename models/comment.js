var dynamoose = require("dynamoose");
var Schema = dynamoose.Schema;

var CommentSchema = new Schema ({
    id: String,
    body: String,
    createdBy: String,
    createdAt: { type: Date, default: Date.now },
});

var Comment = dynamoose.model("MongoLines_Comments", CommentSchema);

module.exports = Comment;