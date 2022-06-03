const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/user/orderController');

router.post(
  '/createOrder/:userId',
  orderController.createOrderAndDeleteInCartOrder
);

module.exports = router;
