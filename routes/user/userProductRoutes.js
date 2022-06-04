const express = require('express');
const router = express.Router();
const productController = require('../../controllers/user/productController');

router.get('/:searchText', productController.getProductInfoBySearchText);

module.exports = router;
