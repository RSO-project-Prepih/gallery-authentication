require('dotenv').config();
const express = require('express');
const promBundle = require('express-prom-bundle');
const winston = require('winston');
const usersApi = require('./routes/users');
const checkApi = require('./routes/check');
const metricsApi = require('./routes/metrics');

const app = express();
const port = 5000;
const logger = require('./logger');

// metrics middleware
const metricsMiddleware = promBundle({
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    includeUp: true,
    metricsPath: '/procMetrics',
    customLabels: {
        project_name: 'Gallery auth',
        project_type: 'metrics',
    },
    promClient: {
        collectDefaultMetrics: {},
    },
});

app.use(metricsMiddleware);

require('./models/db');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS
app.use('/auth', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    next();
});

// root path
app.use('/auth', usersApi);

app.use('/metrics', metricsApi);

// check api - health, liveness, readiness
app.use('/', checkApi);

app.listen(port, () => {
    logger.log({ level: 'info', message: `Listening on port ${port}` });
});

module.exports = {
    app,
};
