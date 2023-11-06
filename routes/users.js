const express = require('express');
const router = express.Router();

const {protect} = require('../middleware/auth');

const usersController = require('../controllers/users');

router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/login', usersController.login);

router.post('/register', usersController.register);

router.get('/users', usersController.getUsers);

module.exports = router;
