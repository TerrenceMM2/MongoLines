var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var ArticleSchema = new Schema ({
    title: String,
    summary: String,
    articleUrl: {
      type: String,
      unique: true
    },
    photoUrl: String,
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
      }]
});

var Article = mongoose.model("Article", ArticleSchema);

module.exports = Article;