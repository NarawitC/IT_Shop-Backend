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
const cloudinary = require('../../utils/cloundinary');

exports.createOrderAndDeleteInCartOrder = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.user;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      createError('User not found', 404);
    }
    await Order.destroy(
      {
        where: {
          status: status.IN_CART,
        },
      },
      { transaction }
    );
    const order = await Order.create({ userId: id }, { transaction });
    res.status(201).json({
      message: 'Order created',
      order,
    });
    await transaction.commit();
  } catch (err) {
    await transaction.rollback();
    next(err);
  }
};

exports.updateOrderToPending = async (req, res, next) => {
  const transaction = await sequelize.transaction();
  try {
    const { id } = req.user;
    const { deliveryPrice, productPrice } = req.body;
    const { address } = await User.findOne({
      attributes: ['address'],
      where: { id },
    });
    if (!address) {
      createError('User address not found', 404);
    }
    const imageUrl = {};
    console.log('\n\n\n');
    if (req.files) {
      if (req.files.paymentSlip) {
        const result = await cloudinary.upload(req.files.paymentSlip[0].path);
        imageUrl.paymentSlip = result.secure_url;
      }
      //| Production uncomment this if you want to upload image
      else {
        createError('Payment Slip is invalid', 400);
      }
    }
    const { paymentSlip } = imageUrl;

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
      OldProduct.quantity = OldProduct.quantity - item.quantity;
      await OldProduct.save();
    });
    const result = await order.update(
      {
        status: status.PENDING,
        paymentSlip,
        paymentAt: new Date(order.updatedAt),
        productPrice,
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
    if (req.user) {
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
      // if no order create empty order
      function createEmptyOrder() {
        const order = {
          id: null,
          status: status.IN_CART,
          userId: id,
          productPrice: 0,
          deliveryPrice: 0,
          paymentPrice: 0,
          totalPrice: 0,
          createdAt: null,
          updatedAt: null,
          OrderItems: [],
        };
        return order;
      }
      // console.log('1', order);
      if (!order) {
        res.status(200).json({
          message: 'No order found',
          order: createEmptyOrder(),
        });
        return;
      }

      // console.log('2', order);
      res.status(200).json({
        message: 'Order found',
        order,
      });
    }
  } catch (err) {
    next(err);
  }
};
