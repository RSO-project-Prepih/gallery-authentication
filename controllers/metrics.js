const User = require('../models/User');
const { connectionAttempts } = require('../models/db');

const metrics = async (req, res) => {
    const numberOfUsers = (await User.findAll()).length;
    return res.status(200).send(
        `<p>Connection attempts: ${connectionAttempts} 
        <br/>
        Number of users: ${numberOfUsers}</p>`
    );
};

module.exports = {
    metrics,
};
