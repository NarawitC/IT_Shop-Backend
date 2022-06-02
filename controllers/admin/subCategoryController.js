const validator = require('validator');

const { SubCategory, Product } = require('../../models/index');

const createError = require('../../utils/createError');

exports.createSubCategory = async (req, res, next) => {
  try {
    const { name, categoryId } = req.body;
    if (!name) {
      createError('Name is required', 400);
    }
    if (!categoryId) {
      createError('Category is required', 400);
    }

    const subCategory = await SubCategory.create({
      name,
      categoryId,
    });
    res.status(201).json({
      message: 'SubCategory created successfully',
      subCategory,
    });
  } catch (error) {
    next(error);
  }
};
