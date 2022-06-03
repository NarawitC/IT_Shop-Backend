const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/admin/orderController');

router.get('/ordersInfo', orderController.getAllOrders);
router.get('/orderInfo/:id', orderController.getOrderById);

module.exports = router;
