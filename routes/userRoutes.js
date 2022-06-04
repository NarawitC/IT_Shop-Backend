const express = require('express');
const router = express.Router();
const userAuthRouter = require('./user/userAuthRoutes');
const userRouter = require('./user/userRoutes');
const orderRouter = require('./user/userOrderRoutes');
const orderItemRouter = require('./user/userOrderItemRoutes');
const productRouter = require('./user/userProductRoutes');
const authenticate = require('../middlewares/authenticate');

router.use('/auth', userAuthRouter);
router.use('/user', authenticate.user, userRouter);
router.use('/order', authenticate.user, orderRouter);
router.use('/orderItem', authenticate.user, orderItemRouter);
router.use('/product', authenticate.user, productRouter);

module.exports = router;
