const express = require('express');
const router = express.Router();
const subCategoryController = require('../../controllers/user/subCategoryController');

router.get('/:subCategoryId', subCategoryController.getSubCategoryById);
router.get('/category/:categoryId', subCategoryController.getSubCategoryByCategoryId);

module.exports = router;
