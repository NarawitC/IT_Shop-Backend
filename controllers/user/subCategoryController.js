const { Category, SubCategory } = require('../../models/index');
const { Op } = require('sequelize');

const createError = require('../../utils/createError');

exports.getSubCategoryById = async (req, res, next) => {
  try {
    const { subCategoryId } = req.params;
    const subCategory = await SubCategory.findOne({
      where: { id: subCategoryId },
      include: [{ model: Category }],
    });
    res.status(200).json({ subCategory });
  } catch (err) {
    createError("Can't get sub category info", 500);
  }
};

exports.getSubCategoryByCategoryId = async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    const subCategories = await SubCategory.findAll({
      where: { categoryId },
    });
    res.status(200).json({ subCategories });
  } catch (err) {
    createError("Can't get sub category info", 500);
  }
};
