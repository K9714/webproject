const express = require('express');

let router = express.Router();

router.get('/', function(req, res) {
    res.render('main_page', {session: req.session});
});

module.exports = router;