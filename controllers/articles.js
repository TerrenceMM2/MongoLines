var Article = require('../models/Article');
var cheerio = require("cheerio");
var axios = require("axios");

module.exports = {
    get: (req, res) => {

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

            Article.create(results).then(function(data) {
                res.status(200).render("results", {data: data, count: results.length});
            }).catch(function(err) {
                res.status(500).json(err);
            });

        });
    }
};