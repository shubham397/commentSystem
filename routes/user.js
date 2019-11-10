const express = require("express");
const router = express.Router();

const user = require('../controllers/userController');

router.post('/add', user.signup);
router.get('/login', user.login); 
router.get('/signup', user.showSignUpPage);
router.get('/:userId',user.showCommentPage);

module.exports = router;