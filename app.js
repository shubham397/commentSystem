const port = 1234;
const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require('mongoose');
const mysql = require('mysql');

const users = require('./routes/user');
const comment = require('./routes/comment');
const userController = require('./controllers/userController');

var app = express();
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost:27017/first');

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
})

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use('/user', users);
app.use('/comment',comment);
app.use('/', userController.showLoginPage);


app.listen(port, () => {
    console.log(`server is running on port ${port}`);
});