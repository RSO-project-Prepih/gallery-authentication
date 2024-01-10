const User = require('../models/User');
const bcrypt = require('bcryptjs');

module.exports = {
    updateUser: async function ({ id, userInput }, req) {
        let user = await User.findByPk(id);
        if (!user) {
            const error = new Error('No user found');
            error.code = 404;
            throw error;
        }

        if (userInput.username) user.username = userInput.username;
        if (userInput.surname) user.surname = userInput.surname;

        const updatedUser = await user.save();
        return {
            ...updatedUser._doc,
            id: updatedUser.id.toString(),
            username: updatedUser.username,
            surname: updatedUser.surname,
        };
    },

    changePassword: async function ({
        id,
        oldPassword,
        newPassword1,
        newPassword2,
    }) {
        let user = await User.findByPk(id);
        if (!user) {
            const error = new Error('No user found');
            error.code = 404;
            throw error;
        }

        if (!(await bcrypt.compare(oldPassword, user.password))) {
            const error = new Error('Incorrect password');
            error.code = 400;
            throw error;
        }

        if (newPassword1 !== newPassword2) {
            const error = new Error('Passwords do not match');
            error.code = 400;
            throw error;
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(newPassword1, salt);

        user.password = hashedPassword;
        await user.save();

        return {
            ...user._doc,
            id: user.id.toString(),
            username: user.username,
            surname: user.surname,
        };
    },
};
