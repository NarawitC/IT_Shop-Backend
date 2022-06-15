const {
  User,
  Order,
  OrderItem,
  Product,
  Category,
  SubCategory,
} = require('../../models/index');
const { Op } = require('sequelize');

const createError = require('../../utils/createError');

exports.getAllProductInfo = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      order: [['name', 'ASC']],
    });
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.getProductBySearchText = async (req, res, next) => {
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

exports.getProductByCategoryId = async (req, res, next) => {
  try {
    console.log(req.params);
    const { categoryId } = req.params;
    const products = await Product.findAll({
      where: { categoryId },
      include: [{ model: Category }],
    });
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.getProductBySubProductId = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;
    const products = await Product.findAll({
      where: { subCategoryId },
      include: [{ model: SubCategory }],
    });
    res.status(200).json({ products });
  } catch (err) {
    next(err);
  }
};

exports.getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findOne({
      where: { id: productId },
    });
    res.status(200).json({ product });
  } catch (err) {
    next(err);
  }
};
