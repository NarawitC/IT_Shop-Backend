const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/info', userController.getUserInfo);
router.get('/purchased/orders', userController.getUserPurchasedOrders);
router.get('/orderItems/:orderId', userController.getUserOrderItemsFromOrderId);
router.patch('/update', userController.updateUserInfo);

module.exports = router;
