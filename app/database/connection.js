var mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'mysql',
    user: 'root',
    password: 'rootroot',
    database: 'web'
});

module.exports = connection;