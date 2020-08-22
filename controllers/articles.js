const Article = require('../models/Article');
const Comment = require('../models/Comment');
const cheerio = require("cheerio");
const axios = require("axios");
const { v4: uuidv4 } = require('uuid');

module.exports = {
    get: (req, res) => {
        // Finds all articles
        Article.scan().exec((err, data) => {
            try {
                res.locals.metaTags = {
                    title: "MongoLines | Articles"
                };
                res.status(200).render("results", {
                    data
                });
            } catch {
                res.status(500).send(err);
            }
        })
    },
    find: async (req, res) => {
        try {
            // Finds all articles based on ID.
            const data = await Article.get(req.params.id)
            res.json(data).status(200);
        } catch {
            res.status(500).send(err);
        }
    },
    fetch: (req, res) => {
        // Will delete all articles from the DB first (in order to avoid duplicates).
        Article.scan().exec((err, data) => {
            try {
                if (data.length > 0) {
                    data.forEach(article => {
                        Article.delete(article.id);
                    });
                }

                let results = [];
                
                // Then, perform a GET Axios call to the site.
                getArticles = async () => {
                    try {
                        const response = await axios.get("https://www.newyorker.com/")
                        const $ = cheerio.load(response.data);

                        await $(".Card__content___2_jDO").each((i, element) => {
    
                            const title = $(element).find(".Card__hed___31cLY").text();
                            const summary = $(element).find(".Card__dek___29Iu1").text();
                            const articleUrl = $(element).find("a:nth-child(2)").attr("href");
                            const photoUrl = $(element).find("img").attr("src");
                            const uuid = uuidv4();
    
                            // For each result based on the class, an object will be pushed to a local array.
                            const result = {
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
                    } catch {
                        res.status(500).send(err);
                    }
                };
                getArticles();
            } catch {
                res.status(500).send(err);
            }
        })
    },
    delete: async (req, res) => {
        try {
            // Deletes articles based on id.
            const response = await Article.delete(req.body.data);
            await Article.scan().exec((err, data) => {
                try {
                    res.status(200).render("results", {data});
                } catch {
                    res.status(500).send(err);
                }
            })
        } catch (err) {
            res.send(err).status(500);
        }
    }
};