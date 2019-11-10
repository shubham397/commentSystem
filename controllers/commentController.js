const mysqlConnection = require('../connection');
let User = require('../models/user')

//render comment page
exports.showCommentPage = (req, res) => {
    let user_id = req.params.userId;
    console.log("cookies user_sid - " + req.cookies.user_sid);
    if (req.cookies.user_sid != "logout") {
        User.find({ _id: user_id }).then((result) => {
            // console.log(result);
            res.render("comment.hbs", { result: result[0] });
        }).catch((err) => {
            console.log(err);
        })
    } else {
        res.redirect('/');
    }


}

//ajax call
exports.getAllComment = (req, res) => {
    //get all comment from mysql
    mysqlConnection.query("SELECT * from comment ORDER BY id ASC", (err, rows, fields) => {
        if (!err) {
            for (let i = 0; i < rows.length; i++) {
                mysqlConnection.query("SELECT COUNT(id) FROM reply where comment_id=" + rows[i].id, (err, replyRows, fields) => {
                    // console.log(replyRows['COUNT(id)']);
                    User.findById(rows[i].userId).then(result => {
                        // console.log(typeof result);
                        rows[i].replyCount = replyRows;
                        if (result == null) {
                            rows[i].userName = rows[i].userId;
                        }
                        else {
                            rows[i].userName = result.name;
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                });


            }

            setTimeout(() => {
                // console.log(rows);
                res.send({
                    status: true,
                    result: rows
                })
            }, 1000);
        }
        else {
            console.log(err);
        }
    });
}

//ajax call
exports.getreply = (req, res) => {
    //get all reply of id from mysql
    res.send({
        status: true,
        msg: "thanks you"
    })
}

//
exports.postReply = (req, res) => {
    let text = req.body.text;
    let commentId = req.body.id;
    let userName = req.body.name;

    //console.log(text + "             " + commentId + "            " + userName);

    mysqlConnection.query("INSERT INTO reply (id, comment_id, text, isDeleted, userName) VALUES ( NULL, '" + commentId + "','" + text + "', '1', '" + userName + "')", (err, rows) => {
        if (!err) {
            if (rows) {
                res.send({
                    status: true
                });
            }
            else {
                res.send({
                    status: false
                });
            }
        }
        else {
            console.log(err);
            res.send({
                status: false
            });
        }
    });
}

//
exports.editComment = (req, res) => {
    let text = req.body.text;
    let id = req.body.id;

    //console.log(text + "              " + id);

    mysqlConnection.query("UPDATE comment SET text='" + text + "' WHERE id=" + id, (err, rows) => {
        if (!err) {
            if (rows) {
                res.send({
                    status: true
                });
            }
            else {
                res.send({
                    status: false
                });
            }
        }
        else {
            console.log(err);
            res.send({
                status: false
            });
        }
    });
}

//
exports.createComment = (req, res) => {
    let text = req.body.text;
    let id = req.body.id;

    mysqlConnection.query("INSERT INTO comment (id, text, dateTime, isDeleted, userId) VALUES ( NULL,'" + text + "','2019-11-10' , '1', '" + id + "')", (err, rows) => {
        if (!err) {
            if (rows) {
                res.send({
                    status: true
                });
            }
            else {
                res.send({
                    status: false
                });
            }
        }
        else {
            console.log(err);
            res.send({
                status: false
            });
        }
    });
}