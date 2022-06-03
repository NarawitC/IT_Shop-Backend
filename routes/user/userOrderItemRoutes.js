const express = require('express');
const router = express.Router();
const orderItemController = require('../../controllers/user/orderItemController');

router.post(
  '/createOrderItem/:orderId',
  orderItemController.createOrderItemByOrderId
);
router.patch(
  '/increaseItem/:orderItemId',
  orderItemController.increaseItemByOrderItemId
);

module.exports = router;
