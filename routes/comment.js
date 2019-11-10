const express = require("express");
const router = express.Router();

const comment = require('../controllers/commentController');

router.get('/all',comment.getAllComment);
router.get('/:userId',comment.showCommentPage);
router.post('/create',comment.createComment);
router.put('/edit',comment.editComment);

router.get('/reply/:comment_id',comment.getreply);//not done
router.post('/reply/:comment_id',comment.postReply);//not done


//two more api

// one - reply
// two - edit

module.exports = router;