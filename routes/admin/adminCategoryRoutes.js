const express = require('express');
const router = express.Router();
const categoryController = require('../../controllers/admin/categoryController');

router.post('/createCategory', categoryController.createCategory);

module.exports = router;
