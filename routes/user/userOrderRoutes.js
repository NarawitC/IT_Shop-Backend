const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/user/orderController');

router.post('/createOrder/:userId', orderController.createOrder);

module.exports = router;
