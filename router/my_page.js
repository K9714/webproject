const express = require('express');
const Mysql = require('../mysql').Mysql;

let router = express.Router();

router.all('/', function(req, res) {
    if (req.session.login === true) {
        res.render('my_page', {session: req.session});
    }
    else {
        req.session.message = "로그인 후 이용해주세요.";
        res.redirect('/login');
    }
});

router.post('/load', async function(req, res) {
    if (req.session.login === true) {
        let no = req.session.userno;
        let board = {};
        board.load = [];
        const rows = await Mysql.Query(`SELECT * FROM board_community WHERE user='${no}' ORDER BY no DESC;`);
        for(let i = 0; i < rows.length; i++) {
            let e = rows[i];
            let obj = {};
            obj.no = e.no;
            obj.title = e.title;
            obj.post = e.post;
            obj.date = e.date;
            obj.recommand = e.recommand;
            let r = await Mysql.Query(`SELECT * FROM board_coment WHERE board_type='0' AND board_no='${e.no}';`);
            obj.coment = r.length;
            board.load.push(obj);
        };
        let r = await Mysql.Query(`SELECT * FROM user_information WHERE no='${no}';`);
        board.nickname = r[0].nickname;
        board.id = r[0].id;
        board.image = r[0].image;
        res.send(board);
    }
});

module.exports = router;