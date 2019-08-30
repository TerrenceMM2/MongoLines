var express = require('express');
var router = express.Router();

router.use('/', require('./app'));
router.use('/comment', require('./comment'));
router.use('/articles', require('./articles'));
router.use('*', function(req, res){
    res.render("404");
});

module.exports = router;