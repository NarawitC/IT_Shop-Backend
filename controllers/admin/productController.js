const validator = require('validator');
const fs = require('fs');

const { User, Order, OrderItem, Product } = require('../../models/index');

const cloudinary = require('../../utils/cloundinary');
const createError = require('../../utils/createError');

exports.createProduct = async (req, res, next) => {
  try {
    const {
      name,
      description,
      price,
      quantity,
      categoryId,
      subCategoryId,
      properties,
    } = req.body;
    // console.log(req.body);
    const imageUrl = {};
    if (req.files) {
      if (req.files.mainPicture) {
        const result = await cloudinary.upload(req.files.mainPicture[0].path);

        imageUrl.mainPicture = result.secure_url;
      }
      if (req.files.subPicture1) {
        const result = await cloudinary.upload(req.files.subPicture1[0].path);

        imageUrl.subPicture1 = result.secure_url;
      }
      if (req.files.subPicture2) {
        const result = await cloudinary.upload(req.files.subPicture2[0].path);

        imageUrl.subPicture2 = result.secure_url;
      }
      if (req.files.subPicture3) {
        const result = await cloudinary.upload(req.files.subPicture3[0].path);

        imageUrl.subPicture3 = result.secure_url;
      }
      if (req.files.subPicture4) {
        const result = await cloudinary.upload(req.files.subPicture4[0].path);
        imageUrl.subPicture4 = result.secure_url;
      }
    }

    if (!name) {
      createError('Product name is invalid', 400);
    }
    if (!price) {
      createError('Product price is invalid', 400);
    }
    if (!quantity) {
      createError('Product quantity is invalid', 400);
    }
    if (!categoryId) {
      createError('Product category is invalid', 400);
    }
    if (!subCategoryId) {
      createError('Product subCategory is invalid', 400);
    }

    const { mainPicture, subPicture1, subPicture2, subPicture3, subPicture4 } =
      imageUrl;

    const product = await Product.create({
      name,
      description,
      price: Number(price),
      quantity,
      mainPicture,
      subPicture1,
      subPicture2,
      subPicture3,
      subPicture4,
      categoryId,
      subCategoryId,
      properties,
    });

    res.status(201).json({
      message: 'Product created successfully',
      product,
    });
  } catch (error) {
    next(error);
  } finally {
    if (req.files) {
      if (req.files.mainPicture) {
        fs.unlinkSync(req.files.mainPicture[0].path);
      }
      if (req.files.subPicture1) {
        fs.unlinkSync(req.files.subPicture1[0].path);
      }
      if (req.files.subPicture2) {
        fs.unlinkSync(req.files.subPicture2[0].path);
      }
      if (req.files.subPicture3) {
        fs.unlinkSync(req.files.subPicture3[0].path);
      }
      if (req.files.subPicture4) {
        fs.unlinkSync(req.files.subPicture4[0].path);
      }
    }
  }
};
