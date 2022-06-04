const express = require('express');
const router = express.Router();
const orderController = require('../../controllers/user/orderController');
const upload = require('../../middlewares/upload');

router.patch('/createOrder', orderController.createOrderAndDeleteInCartOrder);
router.patch(
  '/toPending',
  upload.fields([{ name: 'paymentSlip', maxCount: 1 }]),
  orderController.updateOrderToPending
);

module.exports = router;
