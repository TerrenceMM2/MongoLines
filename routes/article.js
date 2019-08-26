var express = require("express");
var router = express.Router();
var cheerio = require("cheerio");
var axios = require("axios");

// var articleController = require("../controllers/articles");
var Article = require('../models/Article');

router.get('/', function (req, res) {
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
});

router.get('/fetch', function (req, res) {

    Article.remove({}).then(function(data){
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
                res.locals.metaTags = {
                    title: "MongoLines | Articles"
                };
                res.status(200).render("results", {
                    data: data,
                    count: results.length
                });
            }).catch(function (err) {
                res.status(500).json(err);
            });
    
        }).catch(function(err){
            res.status(500).json(err);
        })
    })
    
});

router.delete('/delete/:id', function (req, res) {
    Article.findByIdAndDelete(req.params.id).then(function (data) {
        Article.find({}).then(function (data) {
            res.render("results", {data}).status(200);
        }).catch(function (err) {
            res.json(err);
            // res.status(500).render("404", {
            //     err,
            //     msg: "Lookup error."
            // });
        })
    }).catch(function (err) {
        res.json(err);
        // res.status(500).render("404", {
        //     err,
        //     msg: "Deletion error."
        // });
    })
});

module.exports = router;