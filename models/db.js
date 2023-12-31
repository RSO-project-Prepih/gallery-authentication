require('dotenv').config();
const process = require('process');
const { Sequelize } = require('sequelize');

const DB_URL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

const sequelize = new Sequelize(DB_URL);
let connectionAttempts = 1;

const retryConnection = async (maxRetries, delay) => {
    for (let retryCount = 1; retryCount <= maxRetries; retryCount++) {
        try {
            console.log(
                `Attempting database connection, attempt ${retryCount}`
            );
            await sequelize.authenticate();
            console.log('Connection has been established successfully.');
            connectionAttempts = retryCount;
            return;
        } catch (error) {
            console.error(
                `Unable to connect to the database (attempt ${retryCount}):`,
                error
            );
            if (retryCount < maxRetries) {
                console.log(`Retrying in ${delay / 1000} seconds...`);
                await new Promise((resolve) => setTimeout(resolve, delay));
            }
        }
    }
    console.error(
        `Maximum number of retries (${maxRetries}) reached. Could not establish a connection to the database.`
    );
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
