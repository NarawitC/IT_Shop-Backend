const express = require('express');
const router = express.Router();
const adminController = require('../../controllers/admin/adminController');

router.get('/info', adminController.getAdminInfo);

module.exports = router;
