const User = require('../models/User');

const liveness = (req, res) => {
    return res.status(200).json({status: 'UP'});
}

const readiness = async (req, res) => {
    const users = await User.findAll();
    const statusCode = await res.statusCode;

    if (users) {
        return res.status(statusCode).json(
            {
                status: 'UP', 
                statusCode: statusCode,
                checks: {
                    name: "PingCheck database",
                    state: "UP"
                }
            }
        );
    }

    return res.status(statusCode).json(
        {
            status: 'DOWN', 
            statusCode: statusCode,
            checks: {
                name: "PingCheck database",
                state: "DOWN"
            }
        }
    );
}

module.exports = {
    liveness,
    readiness,
}
