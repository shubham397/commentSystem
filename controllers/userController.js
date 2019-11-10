const bcrypt = require('bcrypt');

let User = require('../models/user')

/*
    signUp
*/
exports.signup = (req, res) => {
    var name = req.body.name;
    var email = req.body.email;
    var password = req.body.psw;

    User.create({
        "name": name,
        "email": email,
        "password": bcrypt.hashSync(password, 10),
    })
        .then(user => {
            res.redirect('/user/show');
        })
        .catch((err) => {
            console.log(err);
            res.redirect('/user/add');
        });
}

/*
Show signUp Page in Browser
*/
exports.showSignUpPage = (req, res) => {
    res.render("sign_up.hbs");
}

/*
    Show login Page in Browser
*/
exports.showLoginPage = (req, res) => {
    res.render("login.hbs");
}

/*
Login
*/
exports.login = (req, res) => {

    let email = req.query.email;
    let password = req.query.password;

    // password=bcrypt.hashSync(password, 10);
    // console.log(email + "                      " + password);

    User.find({ "email": `${email}` }).then(result => {
        // console.log("result = " + result[0].password);
        if (result.length > 0) {
            if (bcrypt.compareSync(password, result[0].password)) {
                res.cookie('user_sid',result[0]._id, { maxAge: 900000, httpOnly: true });
                res.send({
                    status: "true",
                    userId: result[0]._id,
                })
            } else {
                res.send({
                    status: "false",
                })
            }
        }
        else {
            res.send({
                status: "false",
            })
        }

    }).catch(err => {
        console.log(err);
        res.send({
            status: "false",
        })
    })
}

exports.logout = async(req, res) => {
    res.cookie('user_sid',"logout", { maxAge: 900000, httpOnly: true });
    res.redirect('/');
}