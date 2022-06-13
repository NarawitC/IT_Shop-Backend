const { Category, SubCategory } = require('../../models/index');
const { Op } = require('sequelize');

const createError = require('../../utils/createError');

exports.getAllCategoryInfo = async (req, res, next) => {
  try {
    const categories = await Category.findAll({
      include: [{ model: SubCategory }],
    });
    res.status(200).json({ categories });
  } catch (err) {
    createError("Can't get category info", 500);
  }
};

exports.getCategoryById = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const category = await Category.findOne({
      where: { id: categoryId },
      include: [{ model: SubCategory }],
    });
    res.status(200).json({ category });
  } catch (err) {
    createError("Can't get category info", 500);
  }
}