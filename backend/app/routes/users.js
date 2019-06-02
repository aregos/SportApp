const express = require('express');
const router = express.Router();
const userController = require('../api/controllers/users');

router.post('/register', userController.create);
router.post('/authenticate', userController.authenticate);
router.post('/update', userController.update);

module.exports = router;