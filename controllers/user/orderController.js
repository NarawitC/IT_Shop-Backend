const { Order, Product, OrderItem, User } = require('../../models/index');
const createError = require('../../utils/createError');

const status = require('../../config/constants');

exports.createOrderAndDeleteInCartOrder = async (req, res, next) => {
  try {
    const { id } = req.user;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      createError('User not found', 404);
    }
    await Order.destroy({
      where: {
        status: status.IN_CART,
      },
    });
    const order = await Order.create({ userId: id });
    res.status(201).json({
      message: 'Order created',
      order,
    });
  } catch (err) {
    next(err);
  }
};
