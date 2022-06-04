const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/user/orderController');

router.post('/createOrder', orderController.createOrderAndDeleteInCartOrder);

module.exports = router;
