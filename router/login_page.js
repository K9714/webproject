const express = require('express');
const Mysql = require('../mysql').Mysql;

let router = express.Router();

router.get('/', function(req, res) {
    if (req.session.login === true){
        res.redirect('/');
    }
    else {
        res.render('login_page', {session: req.session});
    }
});

router.post('/', async function(req, res) {
    let id = req.body.id;
    let pw = req.body.pw;
    let rows = await Mysql.Query(`SELECT * FROM user_information WHERE id='${id}' AND password='${pw}';`);
    if (rows.length != 1) {
        req.session.message = "아이디와 비밀번호를 확인해주세요.";
        res.render('login_page', {session: req.session});
    }
    else {
        req.session.login = true;
        req.session.userno = rows[0].no;
        res.redirect('/');
    }    
});

module.exports = router;