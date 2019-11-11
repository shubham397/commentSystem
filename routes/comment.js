const express = require("express");
const router = express.Router();

const comment = require('../controllers/commentController');

router.get('/all',comment.getAllComment);
router.get('/:userId',comment.showCommentPage);
router.post('/create',comment.createComment);
router.put('/edit',comment.editComment);
router.post('/reply',comment.postReply);

router.get('/reply/:comment_id',comment.getreply);
router.put('/reply/edit',comment.editReply);

module.exports = router;