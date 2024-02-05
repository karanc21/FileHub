const express = require('express');
const router = express.Router();
const fileHubRoutes = require('./fileHubRoutes');

router.use('/files', fileHubRoutes);

module.exports = router;
