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
    // Will store comment collection ids into an array.
    comments: [{
        type: Schema.Types.ObjectId,
        ref: "comment"
      }]
});

var article = mongoose.model("article", ArticleSchema);

module.exports = article;