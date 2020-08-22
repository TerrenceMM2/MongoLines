var dynamoose = require("dynamoose");
var Schema = dynamoose.Schema;

var ArticleSchema = new Schema ({
    id: String,
    title: String,
    summary: String,
    articleUrl: String,
    photoUrl: String,
    // Will store comment collection ids into an array.
    comments: {
      type: Array,
      default: [],
      schema: [{
        type: String
      }]
    }
});

var Article = dynamoose.model("MongoLines_Articles", ArticleSchema);

module.exports = Article;