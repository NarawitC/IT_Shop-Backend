const express = require('express');
const router = express.Router();
const adminAuthRouter = require('./admin/adminAuthRoutes');
const adminProductRouter = require('./admin/adminProductRoutes');
const adminCategoryRouter = require('./admin/adminCategoryRoutes');
const adminSubCategoryRouter = require('./admin/adminSubCategoryRoutes');

router.use('/auth', adminAuthRouter);
router.use('/product', adminProductRouter);
router.use('/category', adminCategoryRouter);
router.use('/subCategory', adminSubCategoryRouter);

module.exports = router;
