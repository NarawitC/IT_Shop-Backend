const { CONFIRMED } = require('../config/constants');
const { User, Order, OrderItem } = require('../models/index');

const createError = require('../utils/createError');

exports.getUserInfo = async (req, res, next) => {
  try {
    const user = await User.findOne({
      attributes: { exclude: ['password'] },
      where: { id: req.user.id },
    });
    if (!user) {
      createError('You are unauthorized', 404);
    }
    res.status(200).json({ user });
  } catch (err) {
    next(err);
  }
};

exports.getUserPurchasedOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { status: CONFIRMED, id: req.user.id },
    });

    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getUserOrderItemsFromOrderId = async (req, res, next) => {
  try {
    const orderId = req.params.orderId;
    const ordersItems = await OrderItem.findAll({
      where: { orderId },
    });

    res.status(200).json({ ordersItems });
  } catch (err) {
    next(err);
  }
};
