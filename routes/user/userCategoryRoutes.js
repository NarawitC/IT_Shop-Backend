const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/user/categoryController');

router.get('/allCategory', categoryController.getAllCategoryInfo);
router.get('/:categoryId', categoryController.getCategoryById);

module.exports = router;
