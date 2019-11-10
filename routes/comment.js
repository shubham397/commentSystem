const express = require("express");
const router = express.Router();

const comment = require('../controllers/commentController');

router.get('/:userId',comment.showCommentPage);

module.exports = router;