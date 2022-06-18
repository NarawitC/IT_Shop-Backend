const validator = require('validator');
const bcryptjs = require('bcryptjs');

const { CONFIRMED } = require('../../config/constants');
const { User, Order, OrderItem, Product } = require('../../models/index');

const createError = require('../../utils/createError');

exports.getUserInfo = async (req, res, next) => {
  try {
    if (req.user) {
      const user = await User.findOne({
        attributes: { exclude: ['password'] },
        where: { id: req.user.id },
      });
      if (!user) {
        createError('You are unauthorized', 404);
      }
      res.status(200).json({ user });
    }
  } catch (err) {
    next(err);
  }
};

exports.getUserPurchasedOrders = async (req, res, next) => {
  try {
    const orders = await Order.findAll({
      where: { status: CONFIRMED, userId: req.user.id },
      include: [
        {
          model: OrderItem,
          attributes: ['id', 'quantity', 'productId'],
          include: [
            {
              model: Product,
              attributes: ['name', 'price', 'mainPicture'],
            },
          ],
        },
      ],
    });
    res.status(200).json({ orders });
  } catch (err) {
    next(err);
  }
};

exports.getUserOrderFromOrderId = async (req, res, next) => {
  try {
    const { orderId } = req.params;
    const orders = await Order.findOne({
      where: { id: orderId },
      include: [
        {
          model: OrderItem,
          attributes: ['id', 'quantity', 'pricePerUnit', 'productId'],
          include: [
            {
              model: Product,
              attributes: ['name', 'mainPicture'],
            },
          ],
        },
      ],
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

exports.updateUserInfo = async (req, res, next) => {
  try {
    const input = req.body;
    if (input.email) {
      const isEmail = validator.isEmail('' + input.email);
      if (!isEmail) {
        createError('Email is invalid format', 400);
      }
    }

    if (input.password || input.confirmPassword) {
      if (input.password !== input.confirmPassword) {
        createError('Password did not match', 400);
      }
    }

    if (input.password) {
      const hashedPassword = await bcryptjs.hash(input.password, 12);
      input.password = hashedPassword;
    }

    if (input.phoneNumber) {
      const isPhoneNumber = validator.isMobilePhone(
        '' + input.phoneNumber,
        'th-TH'
      );
      if (!isPhoneNumber) {
        createError('PhoneNumber is invalid format', 400);
      }
    }
    const updated = await User.update(input, {
      where: { id: req.user.id },
    });
    //! ถ้าจะใช้ของจากการ update ให้ findOneมาใหม่ เพราะupdate return จำนวน recordที่ทำการ update

    if (!updated) {
      createError('You are unauthorized', 404);
    }
    res.status(200).json({ message: 'User updated' });
  } catch (err) {
    next(err);
  }
};
