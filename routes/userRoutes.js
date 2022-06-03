const express = require('express');
const router = express.Router();
const userAuthRouter = require('./user/userAuthRoutes');
const userRouter = require('./user/userRoutes');
const orderRouter = require('./user/userOrderRoutes');
const authenticate = require('../middlewares/authenticate');

router.use('/auth', userAuthRouter);
router.use('/user', authenticate.user, userRouter);
router.use('/order', authenticate.user, orderRouter);

module.exports = router;
