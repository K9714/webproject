const express = require('express');
const Mysql = require('../mysql').Mysql;

let router = express.Router();

router.get('/', async function(req, res) {
    let no = req.query.no;
    res.render('post_page', {session: req.session, post_no: no});
});

router.get('/loadPost', async function(req, res) {
    let no = req.query.no;
    const rows = await Mysql.Query(`SELECT * FROM board_community WHERE no='${no}';`);
    if (rows.length == 0) {
        res.redirect('/mainpage');
    }
    else {
        let post = rows[0];
        let data = {};
        data.no = no;
        data.title = post.title;
        data.post = post.post;
        data.date = post.date;
        data.recommand = post.recommand;
        if (post.secret == 1) {
            data.nickname = "익명";
            data.image = "profile_icon.png";
        }
        else {
            let r = await Mysql.Query(`SELECT * FROM user_information WHERE no='${post.user}';`);
            data.nickname = r[0].nickname;
            data.image = r[0].image;
        }
        let r = await Mysql.Query(`SELECT * FROM board_coment WHERE board_no='${data.no}' ORDER BY no DESC;`);
        data.comentList = [];
        data.coment = r.length;
        for(let i = 0; i < r.length; i++) {
            let e = r[i];
            let obj = {};
            if (e.secret == 1) {
                obj.nickname = "익명";
                obj.image = "profile_icon.png"
            }
            else {
                let u = await Mysql.Query(`SELECT * FROM user_information WHERE no='${e.user_no}';`);
                obj.nickname = u[0].nickname;
                obj.image = u[0].image;
            }
            obj.post = e.post;
            obj.date = e.date;
            data.comentList.push(obj);
        }
        res.send(data);
    }
});

router.post('/recommand', async function(req, res) {
    if (req.session.login === true) {
        let postno = req.body.no;
        await Mysql.Query(`UPDATE board_community SET recommand = recommand + 1 WHERE no='${postno}';`);
        res.send({res: 1});
    }
    else {
        res.send({res: 2});
    }
});

module.exports = router;