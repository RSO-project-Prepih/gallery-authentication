require('dotenv').config();
const process = require('process');
const { Sequelize } = require('sequelize');
const logger = require('../logger');

const DB_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(DB_URL);
let connectionAttempts = 1;

const retryConnection = async (maxRetries, delay) => {
    for (let retryCount = 1; retryCount <= maxRetries; retryCount++) {
        try {
            logger.log({
                level: 'info',
                message: `Attempting database connection, attempt ${retryCount}`,
            });
            await sequelize.authenticate();
            logger.log({
                level: 'info',
                message: 'Connection has been established successfully.',
            });
            connectionAttempts = retryCount;
            return;
        } catch (error) {
            logger.log({
                level: 'error',
                message: `Unable to connect to the database (attempt ${retryCount}):`,
            });
            if (retryCount < maxRetries) {
                logger.log({
                    level: 'info',
                    message: `Retrying in ${delay / 1000} seconds...`,
                });
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }
    logger.log({
        level: 'error',
        message: `Maximum number of retries (${maxRetries}) reached. Could not establish a connection to the database.`,
    });
    process.exit(1);
};

const testConnection = async () => {
    const maxRetries = 5;
    const delayBetweenRetries = 2000;
    await retryConnection(maxRetries, delayBetweenRetries);
};

testConnection();

module.exports = {
    sequelize,
    connectionAttempts,
};
