const { CONFIRMED } = require('../config/constants');
const { User, Order } = require('../models/index');

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
      where: { status: CONFIRMED },
    });

    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};
