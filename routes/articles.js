var express = require("express");
var router = express.Router();
var articleController = require("../controllers/articles");

// URLs that come in from the /articles path will be routed to the appropriate controller based on the path the follows and the method used.
router.get('/', articleController.get);
router.get('/fetch', articleController.fetch);
router.delete('/delete', articleController.delete);
router.get('/:id', articleController.find);

module.exports = router;