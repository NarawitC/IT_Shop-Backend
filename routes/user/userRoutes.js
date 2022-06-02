const express = require('express');
const router = express.Router();
const userController = require('../../controllers/userController');

router.get('/info', userController.getUserInfo);
router.get('/purchased/orders', userController.getUserPurchasedOrders);

module.exports = router;
