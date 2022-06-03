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

router.patch(
  '/decreaseItem/:orderItemId',
  orderItemController.decreaseItemByOrderItemId
);

router.delete(
  '/deleteOrderItem/:orderItemId',
  orderItemController.deleteOrderItemByOrderItemId
);

module.exports = router;
