const { User, Order, OrderItem, Product } = require('../../models/index');
const { Op } = require('sequelize');

const createError = require('../../utils/createError');

exports.getProductInfoBySearchText = async (req, res, next) => {
  try {
    const { searchText } = req.params;
    const products = await Product.findAll({
      where: { name: { [Op.like]: `%${searchText}%` } },
    });
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};
