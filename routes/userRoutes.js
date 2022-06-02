const express = require('express');
const router = express.Router();
const userAuthRouter = require('./user/userAuthRoutes');
const userRouter = require('./user/userRoutes');
const authenticate = require('../middlewares/authenticate');

router.use('/auth', userAuthRouter);
router.use('/user', authenticate.user, userRouter);

module.exports = router;
