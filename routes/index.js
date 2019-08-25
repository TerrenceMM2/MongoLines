var express = require('express');
var router = express.Router();

router.use('/', require('./app'));
router.use('/api/comment', require('./comment'));
router.use('/api/article', require('./article'));
router.use('*', function(req, res){
    res.render("404");
});

module.exports = router;