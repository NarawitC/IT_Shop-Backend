const express = require('express');
const router = express.Router();
const productController = require('../../controllers/user/productController');

router.get(
  '/searchText/:searchText',
  productController.getProductInfoBySearchText
);
router.get('/category/:categoryId', productController.getProductByCategoryId);
router.get(
  '/subCategory/:subCategoryId',
  productController.getProductBySubProductId
);

module.exports = router;
