const express = require('express');
const multer = require('multer');
const invoiceRoutes = require('./routes/invoiceRoutes');
const path = require('path');


const app = express();

// Multer middleware for handling file uploads
const upload = multer({ dest: 'uploads/' });

// Use the routes for invoice handling
app.use('/invoices', upload.single('file'), invoiceRoutes);

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

// Serve the HTML UI for file upload
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

