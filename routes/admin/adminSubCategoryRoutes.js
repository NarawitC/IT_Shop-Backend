const express = require('express');
const router = express.Router();
const subCategoryController = require('../../controllers/admin/subCategoryController');

router.post('/createSubCategory', subCategoryController.createSubCategory);

module.exports = router;
