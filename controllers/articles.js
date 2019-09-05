var article = require('../models/article');
var cheerio = require("cheerio");
var axios = require("axios");

module.exports = {
    get: function(req, res) {
        // Finds all articles
        article.find({}).then(function (data) {
            res.locals.metaTags = {
                title: "MongoLines | Articles"
            };
            res.render("results", {
                data
            });
        }).catch(function (err) {
            res.status(500).send(err);
        })
    },
    find: function(req, res) {
        // Finds all articles based on ID.
        article.findById(req.params.id).then(function(data) {
            res.json(data).status(200);
        }).catch(function(err) {
            res.status(500).send(err);
        })
    },
    fetch: function(req, res) {
        // Will delete all articles from the DB first (in order to avoid duplicates).
        article.deleteMany({}).then(function (data) {
            // Then, perform a GET Axios call to the site.
            axios.get("https://www.newyorker.com/").then(function (response) {

                var $ = cheerio.load(response.data);
                var results = [];

                // For each result based on the class, an object will be pushed to a local array.
                $(".Card__content___2_jDO").each(function (i, element) {

                    var title = $(element).find(".Card__hed___31cLY").text();
                    var summary = $(element).find(".Card__dek___29Iu1").text();
                    var articleUrl = $(element).find("a:nth-child(2)").attr("href");
                    var photoUrl = $(element).find("img").attr("src");

                    results.push({
                        title,
                        summary,
                        articleUrl: "https://www.newyorker.com" + articleUrl,
                        photoUrl
                    });
                });

                // Finally, the results array will be created in the database and the number of created records will be sent back to the front-end.
                article.create(results).then(function (data) {
                    res.status(200).json({
                        count: data.length
                    });
                }).catch(function (err) {
                    res.status(500).json(err);
                });

            }).catch(function (err) {
                res.status(500).json(err);
            })
        })
    },
    delete: function(req, res) {
        // Deletes articles based on id.
        article.deleteOne({
                "_id": req.body.data
            }).then(() => {
                // Find all articles now that the previous article has been deleted.
                article.find({});
            })
            .then(function (data) {
                res.render("results", {
                    data
                });
            })
            .catch(function (err) {
                console.log(err)
            })
    }
};