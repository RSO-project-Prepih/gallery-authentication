const express = require('express');
const router = express.Router();

const metricsController = require('../controllers/metrics');

router.get('/', metricsController.metrics);

module.exports = router;
