const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');
const { protect } = require('../middleware/auth');

router.post('/login', usersController.login);

router.post('/register', usersController.register);

router.get('/users', usersController.getUsers);

router.get('/users/me', protect, usersController.getMe);

module.exports = router;
