const User = require('../models/User');
const { connectionAttempts } = require('../models/db');

const metrics = async (req, res) => {
    const numberOfUsers = (await User.findAll()).length;
    return res.status(200).type('text/plain').send(
        'Connection attempts: ' + connectionAttempts + '\nNumber of users: ' + numberOfUsers
    );
};

module.exports = {
    metrics,
};
