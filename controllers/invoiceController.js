const { parseFile } = require('../services/fileServices');
const { validateInvoices, convertToJSON, createInvoice } = require('../services/invoiceServices');

exports.processFile = async (req, res) => {
    try {
        const file = req.file;

        // Parse the file (CSV or Excel)
        const invoices = await parseFile(file);

        // Validate the invoices
        const { validInvoices, errors } = validateInvoices(invoices);

        // Convert valid invoices to JSON
        const jsonInvoices = convertToJSON(validInvoices);

        // Simulate invoice creation
        jsonInvoices.forEach(createInvoice);

        res.json({ success: true, processedInvoices: jsonInvoices, errors });
    } catch (error) {
        res.status(500).json({ success: false, message: 'An error occurred during processing', error });
    }
};
