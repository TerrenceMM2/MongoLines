var express = require("express");
var router = express.Router();
var commentController = require("../controllers/Comments");

router.get('/', commentController.all);
router.delete('/:id', commentController.delete);
router.get('/:id', commentController.get);
router.post('/:id', commentController.comment);

module.exports = router;