const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users');

router.post('/login', usersController.login);

router.post('/register', usersController.register);

router.get('/users', usersController.getUsers);

module.exports = router;
