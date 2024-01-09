require('dotenv').config();
const express = require('express');
const promBundle = require('express-prom-bundle');
const winston = require('winston');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const usersApi = require('./routes/users');
const checkApi = require('./routes/check');
const metricsApi = require('./routes/metrics');

const app = express();
const port = 5000;
const logger = require('./logger');

var swaggerOptions = {
    swaggerDefinition: {
        openapi: "3.0.0",
        info: {
            title: "Gallery auth",
            version: "1.0.0",
        },
        license: {
            name: "GNU LGPLv3",
            url: "https://choosealicense.com/licenses/lgpl-3.0"
        },
        contact: {
            name: "Tine Črnugelj",
            email: "tc5911@student.uni-lj.si"
        },
        servers: [
            { url: "http://localhost:5000/" },
            { url: "http://34.140.187.81/"}
        ]
    },
    apis: [
      "./models/User.js",
    ]
};
const swaggerDocument = swaggerJsdoc(swaggerOptions);

// metrics middleware
const metricsMiddleware = promBundle({
    includeMethod: true,
    includePath: true,
    includeStatusCode: true,
    includeUp: true,
    metricsPath: '/metrics',
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
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE', 'PATCH');
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

// docs
usersApi.use("/openapi", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
usersApi.get("/swagger.json", (req, res) => {
  res.status(200).json(swaggerDocument);
});


app.listen(port, () => {
    logger.log({ level: 'info', message: `Listening on port ${port}` });
});

module.exports = {
    app,
};
