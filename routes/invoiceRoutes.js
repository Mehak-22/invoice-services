const express = require('express');
const { processFile } = require('../controllers/invoiceController');
const router = express.Router();

// Define the file upload route
router.post('/upload', processFile);

module.exports = router;
