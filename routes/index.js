var express = require('express');
var router = express.Router();

// router.use('/', require('./app'));
router.use('/comment', require('./comment'));
router.use('/article', require('./article'));

module.exports = router;