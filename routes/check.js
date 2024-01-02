const express = require('express');
const router = express.Router();

const checkApi = require('../controllers/check');

router.get('/', (req, res) => {
    res.send('Auth service working!');
});

router.get('/live', checkApi.liveness);
router.get('/ready', checkApi.readiness);

module.exports = router;
