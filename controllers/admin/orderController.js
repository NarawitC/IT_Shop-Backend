const { Order, Product, OrderItem, User } = require('../../models/index');
const createError = require('../../utils/createError');

exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: User,
          attributes: ['id'],
          include: [
            {
              model: OrderItem,
              attributes: ['id', 'quantity', 'productId', 'price'],
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
    const orderId = req.params.orderId;
    const order = await Order.findOne({
      where: { orderId },
      include: [
        {
          model: User,
          attributes: { exclude: ['password'] },
          include: [
            {
              model: OrderItem,
              include: [
                {
                  model: Product,
                },
              ],
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
