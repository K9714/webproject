const fs = require('fs');
const mysql = require('mysql2/promise');

class Mysql {
    constructor() {
        this.mysql = mysql;
        this.setting = this.readConnectionSetting();
    }

    readConnectionSetting() {
        let data = fs.readFileSync("./settings/config.json", 'utf8');
        return JSON.parse(data).mysql;
    }

    async Query(sql) {
        let connection = await this.connection.getConnection(async conn => conn);
        let [row] = await connection.query(sql);
        connection.release();
        return row;
    }

    async Connect() {
        this.connection = this.mysql.createPool(this.setting);
    }

    async End() {
        await this.connection.roolback();
    }
}

let mysqlobj = new Mysql();
mysqlobj.Connect();

module.exports = {
    Mysql: mysqlobj
};