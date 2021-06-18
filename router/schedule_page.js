const express = require('express');

let router = express.Router();

router.all('/', function(req, res) {
    if (req.session.login === true) {
        res.render('schedule_page', {session: req.session});
    }
    else {
        req.session.message = "로그인 후 이용해주세요.";
        res.redirect('/login');
    }
});

module.exports = router;