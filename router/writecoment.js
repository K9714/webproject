const express = require('express');
const Mysql = require('../mysql').Mysql;
let router = express.Router();

router.post('/community', async function(req, res) {
    if (req.session.login !== true) {
        res.send({res: 2});
        return;
    }
    let no = req.session.userno;
    let postno = req.body.postno;
    let coment = req.body.coment;
    let secret = req.body.secret;
    let date = Date.now();
    await Mysql.Query(`INSERT INTO board_coment(board_type, board_no, user_no, post, secret, date) VALUES('0', '${postno}', '${no}', '${coment}', '${secret}', '${date}');`);
    res.send({res: 1});
});

module.exports = router;