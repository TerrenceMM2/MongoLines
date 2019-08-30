var express = require("express");
var router = express.Router();
var articleController = require("../controllers/articles");

router.get('/', articleController.get);
router.get('/fetch', articleController.fetch);
router.delete('/delete', articleController.delete);

module.exports = router;