const fs = require('fs');
const app = require('./app');

let config = JSON.parse(fs.readFileSync('./settings/config.json', 'utf-8'));
app.init(config.web);