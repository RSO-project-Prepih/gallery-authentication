const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const asyncHandler = require('express-async-handler');

const register = asyncHandler(async(req, res) => {
    const {name, surname, password} = req.body;

    if (!name || !surname || !password) {
        return res.status(400).json({message: 'Please fill all fields'});
    }

    /*
    const userExists = await User.findOne({where: {surname: surname}})
    if (userExists) {
        return res.status(400).json({message: 'User already exists.'})
    }
    */

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
        name,
        surname,
        password: hashedPassword
    }).catch(err => {
        console.log(err);
    });

    if (user) {
        return res.status(201).json({
            _id: user.id,
            name: user.name,
            surname: user.surname,
            token: generateToken(user._id)
        })
    }
    else {
        return res.status(400).json({message: 'Invalid user data'})
    }
});

const login = asyncHandler(async(req, res) => {
    const {email, password} = req.body

    const user = await User.findOne({email})

    if (user && (await bcrypt.compare(password, user.password))) {
        return res.json({
            _id: user.id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    }
    else {
        return res.status(400).json({message: 'Invalid credentials'})
    }
});

const getUsers = async (req, res) => {
    const users = await User.findAll();
    return res.status(200).json(users);
}

const getMe = asyncHandler(async(req, res) => {
    return res.status(200).json(req.user);
})

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: '30d'
    });
}

module.exports = {
    register,
    login,
    getMe,
    getUsers,
}
