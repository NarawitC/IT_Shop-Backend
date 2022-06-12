const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/user/categoryController');

router.get('/allCategory', categoryController.getAllCategoryInfo);

module.exports = router;
