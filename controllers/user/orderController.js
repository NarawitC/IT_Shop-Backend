const { Order, Product, OrderItem, User } = require('../../models/index');
const createError = require('../../utils/createError');

exports.createOrder = async (req, res, next) => {
  try {
    const { userId } = req.params;
    const user = await User.findOne({ where: { id: userId } });
    if (!user) {
      createError('User not found', 404);
    }

    const order = await Order.create({ userId });
    res.status(201).json({
      message: 'Order created',
      order,
    });
  } catch (err) {
    next(err);
  }
};
