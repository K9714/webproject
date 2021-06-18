const express = require('express');
const Mysql = require('../mysql').Mysql;

let router = express.Router();

// 게시글 로드
router.post('/', async function(req, res){
    let board = {};
    board.load = [];
    const rows = await Mysql.Query(`SELECT * FROM board_community ORDER BY no DESC;`);
    for(let i = 0; i < rows.length; i++) {
        let e = rows[i];
        let obj = {};
        obj.no = e.no;
        obj.title = e.title;
        obj.post = e.post;
        obj.date = e.date;
        obj.recommand = e.recommand;
        if (e.secret == 1) {
            obj.user = "익명";
        }
        else {
            let r = await Mysql.Query(`SELECT * FROM user_information WHERE no='${e.user}';`);
            obj.user = r[0].nickname;
        }
        r = await Mysql.Query(`SELECT * FROM board_coment WHERE board_type='0' AND board_no='${e.no}';`);
        obj.coment = r.length;
        board.load.push(obj);
    };
    res.send(board);
});

module.exports = router;