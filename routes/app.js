var express = require("express");
var router = express.Router();

var articleController = require("../controllers/articles");

router.get('/', articleController.get);

module.exports = router;