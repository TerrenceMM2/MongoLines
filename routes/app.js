var express = require("express");
var router = express.Router();

router.get('/', function(req, res){
    res.locals.metaTags = {
        title: "MongoLines | Home"
      };
    res.render("index", { data: "This is the home page." });
});

module.exports = router;