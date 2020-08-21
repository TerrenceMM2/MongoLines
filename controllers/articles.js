var Article = require('../models/Article');
var cheerio = require("cheerio");
var axios = require("axios");
var { v4: uuidv4 } = require('uuid');

module.exports = {
    get: function(req, res) {
        // Finds all articles
        Article.get({}).then(function (data) {
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
        Article.get(req.params.id).then(function(data) {
            res.json(data).status(200);
        }).catch(function(err) {
            res.status(500).send(err);
        })
    },
    fetch: (req, res) => {
        // Will delete all articles from the DB first (in order to avoid duplicates).
        Article.scan().exec((err, data) => {
            // Then, perform a GET Axios call to the site.
            try {
                if (data.length > 0) {
                    data.forEach(article => {
                        Article.delete(article.id);
                    });
                }

                var results = [];
                
                getArticles = async () => {
                    try {
                        var response = await axios.get("https://www.newyorker.com/")
                        var $ = cheerio.load(response.data);

                        await $(".Card__content___2_jDO").each((i, element) => {
    
                            var title = $(element).find(".Card__hed___31cLY").text();
                            var summary = $(element).find(".Card__dek___29Iu1").text();
                            var articleUrl = $(element).find("a:nth-child(2)").attr("href");
                            var photoUrl = $(element).find("img").attr("src");
                            var uuid = uuidv4();
    
                            // For each result based on the class, an object will be pushed to a local array.
                            var result = {
                                id: uuid,
                                title,
                                summary,
                                articleUrl: "https://www.newyorker.com" + articleUrl,
                                photoUrl
                            };
    
                            results.push(result);
                            Article.create(result);
                        });

                        res.status(200).json({
                            count: results.length
                        });
                    } catch (err) {
                        res.status(500).send(err);
                    }
                };
                getArticles();
            } catch (err) {
                res.status(500).send(err);
            }
        })
    },
    delete: async (req, res) => {
        try {
            // Deletes articles based on id.
            await Article.delete(req.body.data);
            await Article.scan().exec((err, data) => {
                try {
                    res.render("results", {data});
                } catch {
                    res.status(500).send(err);
                }
            })
        } catch (err) {
            res.status(500).send(err);
        }
    }
};