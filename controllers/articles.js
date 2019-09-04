var Article = require('../models/Article');
var cheerio = require("cheerio");
var axios = require("axios");

module.exports = {
    get: function(req, res) {
        Article.find({}).then(function (data) {
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
        Article.findById(req.params.id).then(function(data) {
            res.json(data).status(200);
        }).catch(function(err) {
            res.status(500).send(err);
        })
    },
    fetch: function(req, res) {
        Article.deleteMany({}).then(function (data) {
            axios.get("https://www.newyorker.com/").then(function (response) {

                var $ = cheerio.load(response.data);
                var results = [];

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

                Article.create(results).then(function (data) {
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
        Article.deleteOne({
                "_id": req.body.data
            }).then(() => {
                Article.find({});
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