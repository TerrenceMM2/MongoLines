var express = require("express");
var router = express.Router();

var commentController = require("../controllers/comments");

router.get('/', commentController.get);

module.exports = router;