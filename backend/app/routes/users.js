const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/users');

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.post('/updateUserInfo', userController.updateUserInfo);
router.post('/getUserInfo', userController.getUserInfo);
router.post('/updateSettingsList', userController.updateSettingsList);
router.post('/getSettingsList', userController.getSettingsList);
router.post('/searchFriends', userController.searchFriends);

module.exports = router;