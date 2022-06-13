const express = require('express');
const router = express.Router();
const subCategoryController = require('../../controllers/user/subCategoryController');

router.get('/:subCategoryId', subCategoryController.getSubCategoryById);

module.exports = router;
