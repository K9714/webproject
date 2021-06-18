const express = require('express');
const Mysql = require('../mysql').Mysql;
let router = express.Router();

router.get('/', function(req, res) {
    if (req.session.login === true) {
        res.redirect('/');
    }
    else {
        res.render('register_page', {session: req.session});
    }
});

router.post('/', async function(req, res) {
    let nickname = req.body.nickname;
    let id = req.body.id;
    let pw = req.body.pw;
    await Mysql.Query(`INSERT INTO user_information(nickname, id, password) VALUES('${nickname}', '${id}', '${pw}');`);
    res.redirect('/login');
});


router.get('/nicknameCheck', async function(req, res) {
    let get = req.query;
    let rows = await Mysql.Query("SELECT * FROM user_information WHERE nickname='" + get.nickname + "';");
    if (rows.length > 0) {
        res.send({res: 0});
    }
    else {
        res.send({res: 1});
    }
});

router.get('/idCheck', async function(req, res) {
    let get = req.query;
    let rows = await Mysql.Query("SELECT * FROM user_information WHERE id='" + get.id + "';");
    if (rows.length > 0) {
        res.send({res: 0});
    }
    else {
        res.send({res: 1});
    }
    
});
module.exports = router;