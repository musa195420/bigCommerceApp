const express = require('express');
const router = express.Router();
const { estimateTax } = require('./controller');
const { validateEstimate } = require('./validation');

router.post('/estimate', validateEstimate, estimateTax);

module.exports = router;
