const validator = require('validator');
const fs = require('fs');

const {
  User,
  Order,
  OrderItem,
  Product,
  Category,
  SubCategory,
} = require('../../models/index');

const cloudinary = require('../../utils/cloundinary');
const createError = require('../../utils/createError');
const uploadAndDestroyPictureFromCloundinary = require('../../utils/uploadAnddestroyPictureFromCloundinary');

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
    if (description) {
      if (description.length > 400) {
        createError('Description is less than 400 letter', 400);
      }
    }
    if (properties) {
      if (properties.length > 2000) {
        createError('Properties is less than 2000 letter', 400);
      }
    }
    const imageUrl = {};
    if (req.files) {
      if (req.files.mainPicture) {
        // console.log(req.files.mainPicture[0].path);
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

    const {
      mainPicture = 'https://res.cloudinary.com/narawit/image/upload/v1655109976/IT_Shop/Default%20photo/defaultMainPicture_kyzjrb.png',
      subPicture1 = 'https://res.cloudinary.com/narawit/image/upload/v1655109981/IT_Shop/Default%20photo/defaultSubPicture_e1uec8.png',
      subPicture2 = 'https://res.cloudinary.com/narawit/image/upload/v1655109981/IT_Shop/Default%20photo/defaultSubPicture_e1uec8.png',
      subPicture3 = 'https://res.cloudinary.com/narawit/image/upload/v1655109981/IT_Shop/Default%20photo/defaultSubPicture_e1uec8.png',
      subPicture4 = 'https://res.cloudinary.com/narawit/image/upload/v1655109981/IT_Shop/Default%20photo/defaultSubPicture_e1uec8.png',
    } = imageUrl;

    const product = await Product.create({
      name,
      description: description || null,
      price: Number(price),
      quantity: Number(quantity),
      mainPicture,
      subPicture1,
      subPicture2,
      subPicture3,
      subPicture4,
      categoryId,
      subCategoryId,
      properties: properties || null,
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

exports.updateProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const oldProduct = await Product.findByPk(productId);
    const {
      name,
      description,
      price,
      quantity,
      categoryId,
      subCategoryId,
      properties,
    } = req.body;
    if (!oldProduct) {
      createError('Product not found', 404);
    }
    // console.log(req.body);
    const imageUrl = {};
    if (req.files) {
      if (req.files.mainPicture) {
        imageUrl.mainPicture = await uploadAndDestroyPictureFromCloundinary(
          oldProduct.mainPicture,
          req.files.mainPicture[0].path
        );
      }

      if (req.files.subPicture1) {
        imageUrl.subPicture1 = await uploadAndDestroyPictureFromCloundinary(
          oldProduct.subPicture1,
          req.files.subPicture1[0].path
        );
      }
      if (req.files.subPicture2) {
        imageUrl.subPicture2 = await uploadAndDestroyPictureFromCloundinary(
          oldProduct.subPicture2,
          req.files.subPicture2[0].path
        );
      }
      if (req.files.subPicture3) {
        imageUrl.subPicture3 = await uploadAndDestroyPictureFromCloundinary(
          oldProduct.subPicture3,
          req.files.subPicture3[0].path
        );
      }
      if (req.files.subPicture4) {
        imageUrl.subPicture4 = await uploadAndDestroyPictureFromCloundinary(
          oldProduct.subPicture4,
          req.files.subPicture4[0].path
        );
      }
    }

    const { mainPicture, subPicture1, subPicture2, subPicture3, subPicture4 } =
      imageUrl;

    const product = await Product.update(
      {
        name: name ? name : undefined,
        description,
        price: price ? Number(price) : undefined,
        quantity: quantity ? Number(quantity) : undefined,
        mainPicture,
        subPicture1,
        subPicture2,
        subPicture3,
        subPicture4,
        categoryId: categoryId ? categoryId : undefined,
        subCategoryId: subCategoryId ? subCategoryId : undefined,
        properties,
      },
      { where: { id: productId } }
    );

    res.status(200).json({
      message: 'Product updated successfully',
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

exports.deleteProduct = async (req, res, next) => {
  try {
    const { productId } = req.params;
    const product = await Product.findByPk(productId);
    if (!product) {
      createError('Product not found', 404);
    }
    await product.destroy();
    res.status(200).json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllProductInfo = async (req, res, next) => {
  try {
    const products = await Product.findAll({
      include: [
        {
          model: Category,
          attributes: ['name'],
        },
        {
          model: SubCategory,
          attributes: ['name'],
        },
      ],
    });
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};
