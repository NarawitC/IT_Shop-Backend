const {
  Order,
  Product,
  OrderItem,
  User,
  sequelize,
} = require('../../models/index');
const createError = require('../../utils/createError');
const fs = require('fs');

const status = require('../../config/constants');
const calculateDeliveryPrice = require('../../services/calculateDeliveryPrice');
const cloudinary = require('../../utils/cloundinary');

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

exports.updateOrderToPending = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { address } = await User.findOne({
      attributes: ['address'],
      where: { id },
    });
    if (!address) {
      createError('User address not found', 404);
    }
    const imageUrl = {};
    if (req.files) {
      if (req.files.paymentSlip) {
        const result = await cloudinary.upload(req.files.paymentSlip[0].path);
        imageUrl.paymentSlip = result.secure_url;
      } else {
        createError('Payment Slip is invalid', 400);
      }
    }
    const { paymentSlip } = imageUrl;
    const transaction = await sequelize.transaction();

    const order = await Order.findOne({
      where: {
        userId: id,
        status: status.IN_CART,
      },
      include: [
        {
          model: OrderItem,
        },
      ],
      attributes: {
        include: [
          [
            sequelize.literal(
              '(SELECT SUM(order_items.price_per_unit * order_items.quantity) FROM order_items)'
            ),
            'sum_price',
          ],
        ],
      },
    });

    if (!order) {
      createError('Order not found', 404);
    }
    const orderArr = JSON.parse(JSON.stringify(order));

    orderArr.OrderItems.forEach(async (item) => {
      const OldProduct = await Product.findOne(
        {
          where: { id: item.productId },
        },
        { transaction }
      );
      if (OldProduct.quantity < item.quantity) {
        createError('Product quantity is not enough', 400);
      }
      (OldProduct.quantity = OldProduct.quantity - item.quantity),
        await OldProduct.save();
    });

    const deliveryPrice = calculateDeliveryPrice();
    const result = await order.update(
      {
        status: status.PENDING,
        paymentSlip,
        paymentAt: new Date(order.updatedAt),
        productPrice: orderArr.sum_price,
        deliveryAddress: address,
        deliveryPrice,
      },
      { transaction }
    );
    await transaction.commit();
    res.status(200).json({
      message: 'Order updated',
      order,
    });
  } catch (err) {
    await transaction.rollback();
    next(err);
  } finally {
    if (req.files) {
      if (req.files.paymentSlip) {
        fs.unlinkSync(req.files.paymentSlip[0].path);
      }
    }
  }
};

exports.getInCartOrder = async (req, res, next) => {
  try {
    const { id } = req.user;
    const order = await Order.findOne({
      where: {
        userId: id,
        status: status.IN_CART,
      },
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
    });
    res.status(200).json({ order });
  } catch (err) {
    next(err);
  }
};
