var express = require("express");
var router = express.Router();
var commentController = require("../controllers/comments");

router.get('/', commentController.all);
router.delete('/', commentController.delete);
router.get('/:id', commentController.get);
router.post('/:id', commentController.comment);

module.exports = router;