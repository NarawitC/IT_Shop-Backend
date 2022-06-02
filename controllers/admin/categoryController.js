const validator = require('validator');

const { Category, Product } = require('../../models/index');

const createError = require('../../utils/createError');

exports.createCategory = async (req, res, next) => {
  try {
    const { name } = req.body;
    if (!name) {
      createError('Name is required', 400);
    }

    const category = await Category.create({
      name,
    });
    res.status(201).json({
      message: 'Category created successfully',
      category,
    });
  } catch (error) {
    next(error);
  }
};
