const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: '172.31.82.193',
    port: '3306',
    user: 'G_52',
    password: 'F8svS6DTed',
    database: 'G_52_DB'
});

module.exports = connection;