const express = require('express');
const Mysql = require('../mysql').Mysql;
let router = express.Router();

router.post('/community', async function(req, res) {
    let title = req.body.title;
    let post = req.body.post;
    let secret = req.body.secret;
    let user = req.session.userno;
    let date = Date.now();
    await Mysql.Query(`INSERT INTO board_community(title, post, date, user, secret) VALUES('${title}', '${post}', '${date}', '${user}', '${secret}');`);
    res.send({res: 1});
});

module.exports = router;