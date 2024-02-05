const express = require('express');
const router = express.Router();
const fileController = require('../controller/fileController');

router.post('/upload', fileController.uploadFile);
router.get('/list', fileController.listFiles);
router.delete('/delete/:filename', fileController.deleteFile);
router.post('/search/:filename', fileController.searchFile);


module.exports = router;
