const express = require('express');
const router = express.Router();
const userController = require('../../controllers/admin/userController');

router.get('/usersInfo', userController.getAllUsers);
router.get('/:userId', userController.getUserById);

module.exports = router;
