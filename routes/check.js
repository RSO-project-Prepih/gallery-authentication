const express = require('express');
const router = express.Router();
const health = require('@cloudnative/health-connect');
const healthCheck = new health.HealthChecker();
// const pingCheck = new health.PingCheck('URL HERE');
// healthCheck.registerLivenessCheck(pingCheck)

router.get('/', (req, res) => {
    res.send('Auth service working!');
});

router.get('/live', health.HealthEndpoint(healthCheck));
router.get('/ready', health.ReadinessEndpoint(healthCheck));

module.exports = router;
