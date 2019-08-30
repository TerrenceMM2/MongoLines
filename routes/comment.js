var express = require("express");
var router = express.Router();
var commentController = require("../controllers/comments");

router.get('/', commentController.get);
router.post('/:id', commentController.comment);
router.delete('/delete', commentController.delete);

module.exports = router;