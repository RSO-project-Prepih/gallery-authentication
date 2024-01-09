const User = require('../models/User');
const { connectionAttempts } = require('../models/db');

const metrics = async (req, res) => {
    const numberOfUsers = (await User.findAll()).length;
    return res.status(200).type('text/plain').send(
        'Connection attempts: ' + connectionAttempts.toString() + '\nNumber of users: ' + numberOfUsers.toString()
    );
};

module.exports = {
    metrics,
};
