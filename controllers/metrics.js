const User = require('../models/User');
const { connectionAttempts } = require('../models/db');

const metrics = async (req, res) => {
    const numberOfUsers = (await User.findAll()).length;
    return res.status(200).json({
        'Connection attempts': connectionAttempts,
        'Number of users': numberOfUsers,
    });
};

module.exports = {
    metrics,
};
