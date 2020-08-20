var dynamoose = require("dynamoose");
var Comment = require('./Comment');
var Schema = dynamoose.Schema;

var ArticleSchema = new Schema ({
    id: String,
    title: String,
    summary: String,
    articleUrl: String,
    photoUrl: String,
    // Will store comment collection ids into an array.
    comments: {
      "type": Set,
      "schema": [Comment]
    }
});

var Article = dynamoose.model("MongoLines_Articles", ArticleSchema);

module.exports = Article;