var express = require("express");
var router = express.Router();
var commentController = require("../controllers/comments");

// URLs that come in from the /comment path will be routed to the appropriate controller based on the path the follows and the method used.
router.get('/', commentController.all);
router.delete('/:id', commentController.delete);
router.get('/:id', commentController.get);
router.post('/:id', commentController.comment);

module.exports = router;