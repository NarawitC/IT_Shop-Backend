const express = require('express');
const router = express.Router();
const userController = require('../../controllers/user/userController');

router.get('/info', userController.getUserInfo);
router.get('/purchased/orders', userController.getUserPurchasedOrders);
router.get('/order/:orderId', userController.getUserOrderFromOrderId);
// router.get('/orderItems/:orderId', userController.getUserOrderItemsFromOrderId);

router.patch('/update', userController.updateUserInfo);

module.exports = router;
