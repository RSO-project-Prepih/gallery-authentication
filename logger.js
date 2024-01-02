const winston = require('winston');

// Create and configure the logger
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [new winston.transports.Console()],
});

// Export a singleton instance of the logger
module.exports = logger;
