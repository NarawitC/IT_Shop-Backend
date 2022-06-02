const express = require('express');
const router = express.Router();
const productController = require('../../controllers/admin/productController');
const upload = require('../../middlewares/upload');

router.post(
  '/createProduct',
  upload.fields([
    { name: 'mainPicture', maxCount: 1 },
    { name: 'subPicture1', maxCount: 1 },
    { name: 'subPicture2', maxCount: 1 },
    { name: 'subPicture3', maxCount: 1 },
    { name: 'subPicture4', maxCount: 1 },
  ]),
  productController.createProduct
);

module.exports = router;
