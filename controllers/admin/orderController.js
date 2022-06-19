const { Order, Product, OrderItem, User } = require('../../models/index');
const createError = require('../../utils/createError');
const status = require('../../config/constants');

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },

        {
          model: OrderItem,
          include: [
            {
              model: Product,
            },
          ],
        },
      ],
    });
    if (!orders) {
      createError('Orders not found', 404);
    }
    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const order = await Order.findOne({
      where: { id: orderId },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
        },
        {
          model: OrderItem,
          include: [
            {
              model: Product,
            },
          ],
        },
      ],
    });
    if (!order) {
      createError('Order not found', 404);
    }
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderToConfirmed = async (req, res, next) => {
  try {
    console.log('first');
    const { id: confirmedAdminId } = req.admin;
    const { orderId } = req.params;
    const order = await Order.findOne({
      where: { id: orderId },
    });
    if (!order) {
      createError('Order not found', 404);
    }
    await order.update({
      status: status.CONFIRMED,
      confirmedAdminId,
    });
    res.status(200).json({ message: 'Order confirmed', order });
  } catch (err) {
    next(err);
  }
};
