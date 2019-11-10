const mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'remotemysql.com',
    user: 'SRspVZVnS1',
    password: 'dVolwcMjYS',
    database: 'SRspVZVnS1'
});

connection.connect((err) => {
    // console.log(err);
    if (!err) {
        console.log("connected");
    }
    else {
        console.log("Connection Failed");
    }
});

module.exports = connection;