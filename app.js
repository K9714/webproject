const express = require('express');
//const reqIp = require('request-ip');
const cookieParser = require('cookie-parser');
const expressSession = require('express-session');
const path = require('path');

let app = express();
let config;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(expressSession({
    secret: '!@#ABCDE#@!',
    resave: false,
    saveUninitialized: true
}));
// ejs
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

function init(_config) {
    config = _config;
    app.listen(config.port, function() {
        console.log(`server started for '${config.port}' port.`);
    });

    // main
    app.get('/', function(req, res) {
        res.redirect('/mainpage');
    });

    // domain

    // resource
    app.use('/font', express.static('font'));
    app.use('/font-awesome', express.static('font-awesome'));
    app.use('/css', express.static('css'));
    app.use('/image', express.static('image'));
    app.use('/script', express.static('script'));
    // router
    app.use('/mainpage', require('./router/main_page'));
    app.use('/login', require('./router/login_page'));
    app.use('/register', require('./router/register_page'));
    app.use('/logout', require('./router/logout'))
    app.use('/loadcommunity', require('./router/loadcommunity'));
    app.use('/writepost', require('./router/writepost'));
    app.use('/writecoment', require('./router/writecoment'));
    app.use('/postpage', require('./router/post_page'));
    app.use('/schedule', require('./router/schedule_page'));
    app.use('/mypage', require('./router/my_page'));
}

module.exports = {
    init: init
};