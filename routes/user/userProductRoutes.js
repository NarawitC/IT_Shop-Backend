const express = require('express');
const router = express.Router();
const productController = require('../../controllers/user/productController');

router.get('/allProduct', productController.getAllProductInfo);
router.get('/searchText/:searchText', productController.getProductBySearchText);
router.get('/category/:categoryId', productController.getProductByCategoryId);
router.get(
  '/subCategory/:subCategoryId',
  productController.getProductBySubProductId
);
router.get('/info/:productId', productController.getProductById);

module.exports = router;
