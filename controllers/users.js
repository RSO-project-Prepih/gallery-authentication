const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');
const { v4 } = require('uuid');
const process = require('process');
const logger = require('../logger');


const register = asyncHandler(async (req, res) => {
    const { username, surname, password } = req.body;
    const uuid = v4();

    if (!username || !surname || !password) {
        return res.status(400).json({ message: 'Please fill all fields' });
    }

    const userExists = await User.findOne({ where: { username: username } });
    if (userExists) {
        return res.status(400).json({ message: 'User already exists.' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        id: uuid,
        username,
        surname,
        password: hashedPassword,
    }).catch((err) => {
        logger.log({ level: 'error', message: `Listening on port ${err}` });
    });

    if (user) {
        logger.log({ level: 'info', message: 'New user created.' });
        return res.status(201).json({
            _id: user.id,
            username: user.username,
            surname: user.surname,
            token: generateToken(user.id),
        });
    } else {
        return res.status(400).json({ message: 'Invalid user data' });
    }
});

const login = asyncHandler(async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username: username } }).catch(
        (err) => logger.log({ level: 'error', message: err })
    );

    if (user && (await bcrypt.compare(password, user.password))) {
        logger.log({ level: 'info', message: `User ${username} log in` });
        return res.json({
            _id: user.id,
            username: user.username,
            token: generateToken(user.id),
        });
    } else {
        return res.status(400).json({ message: 'Invalid credentials' });
    }
});

const deleteUser = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);
    await user.destroy();

    return res.status(204).json({ id: userId });
}

const updateUser = async (req, res) => {
    const userId = req.params.userId;
    const user = await User.findByPk(userId);

    if (req.body.username) {
        user.username = req.body.username;
    }
    if (req.body.surname) {
        user.surname = req.body.surname;
    }

    await user.save();
    return res.status(201).json(user);
}

const getUsers = async (req, res) => {
    const users = await User.findAll();
    return res.status(200).json(users);
};

const getMe = asyncHandler(async (req, res) => {
    return res.status(200).json(req.user);
});

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

deleteUser.apiDoc = {
    summary: "Delete user.",
    operationId: "deleteUser",
    consumes: ["application/json"],
    parameters: [
        {
            in: "query",
            name: "userId",
            required: true,
            type: "string",
        },
    ],
    responses: {
        200: {
          description: "Delete",
        },
    },
}


module.exports = {
    register,
    login,
    getMe,
    getUsers,
    deleteUser,
    updateUser,
};
