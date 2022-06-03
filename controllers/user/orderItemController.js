const {
  Order,
  Product,
  OrderItem,
  User,
  orderItem,
} = require('../../models/index');
const createError = require('../../utils/createError');

exports.createOrderItemByOrderId = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const { product, quantity } = req.body;
    const order = await Order.findOne({ where: { id: orderId } });
    if (!order) {
      createError('Order not found', 404);
    }

    const orderItem = await OrderItem.create({
      orderId,
      productId: product.id,
      quantity,
      pricePerUnit: product.price,
    });
    res.status(201).json({
      message: 'Order Item created',
      orderItem,
    });
  } catch (err) {
    next(err);
  }
};

exports.increaseItemByOrderItemId = async (req, res, next) => {
  try {
    const { orderItemId } = req.params;
    const orderItem = await OrderItem.findOne({ where: { id: orderItemId } });
    if (!orderItem) {
      createError('Order Item not found', 404);
    }
    const updatedOrderItem = await orderItem.update({
      quantity: orderItem.quantity + 1,
    });
    res.status(200).json({
      message: 'Order Item updated',
      updatedOrderItem,
    });
  } catch (err) {
    next(err);
  }
};

exports.decreaseItemByOrderItemId = async (req, res, next) => {
  try {
    const { orderItemId } = req.params;
    const orderItem = await OrderItem.findOne({ where: { id: orderItemId } });
    if (!orderItem) {
      createError('Order Item not found', 404);
    }
    const updatedOrderItem = await orderItem.update({
      quantity: orderItem.quantity - 1,
    });
    res.status(200).json({
      message: 'Order Item updated',
      updatedOrderItem,
    });
  } catch (err) {
    next(err);
  }
};

exports.deleteOrderItemByOrderItemId = async (req, res, next) => {
  try {
    const { orderItemId } = req.params;
    const orderItem = await OrderItem.findOne({ where: { id: orderItemId } });
    if (!orderItem) {
      createError('Order Item not found', 404);
    }
    await orderItem.destroy();
    res.status(200).json({
      message: 'Order Item deleted',
    });
  } catch (err) {
    next(err);
  }
}