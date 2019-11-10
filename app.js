const port = 1234;
const bodyParser = require('body-parser');
const express = require("express");
const mongoose = require('mongoose');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const mysqlConnection = require('./connection');

const users = require('./routes/user');
const comment = require('./routes/comment');
const userController = require('./controllers/userController');

var app = express();
app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost:27017/first');

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
  key: 'user_sid',
  secret: 'somerandonstuffs',
  resave: false,
  saveUninitialized: false,
  cookie: {
      expires: 6000
  }
}));

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