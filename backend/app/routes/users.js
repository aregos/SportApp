const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/users');

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.post('/updateUserInfo', userController.update);
router.post('/getUserInfo', userController.get);

module.exports = router;