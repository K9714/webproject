const express = require('express');

let router = express.Router();

router.all('/', function(req, res) {
    if (req.session.login === true){
        req.session.login = false;
    }
    res.redirect('/');
});

module.exports = router;