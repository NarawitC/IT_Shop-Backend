const express = require('express');
const router = express.Router();
const authController = require('../../controllers/user/authController');

router.post('/signup', authController.userSignUp);
router.post('/signIn', authController.userSignIn);

module.exports = router;
