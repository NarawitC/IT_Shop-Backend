const express = require('express');
const router = express.Router();
const adminAuthRouter = require('./admin/adminAuthRoutes');
const adminProductRouter = require('./admin/adminProductRoutes');
const adminCategoryRouter = require('./admin/adminCategoryRoutes');
const adminSubCategoryRouter = require('./admin/adminSubCategoryRoutes');
const adminUserRouter = require('./admin/adminUserRoutes');
const authenticate = require('../middlewares/authenticate');

router.use('/auth', adminAuthRouter);
router.use('/product', authenticate.admin, adminProductRouter);
router.use('/category', authenticate.admin, adminCategoryRouter);
router.use('/subCategory', authenticate.admin, adminSubCategoryRouter);
router.use('/user', authenticate.admin, adminUserRouter);

module.exports = router;
