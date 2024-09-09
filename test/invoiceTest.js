const { validateInvoices, convertToJSON } = require('../services/invoiceServices');
const assert = require('assert');

describe('Invoice Service', () => {
    it('should validate invoices correctly', () => {
        const invoices = [
            { 'Invoice Number': 'INV001', 'Date': '2023-01-01', 'Customer Name': 'John', 'Total Amount': '100.00' },
            { 'Invoice Number': '', 'Date': 'invalid-date', 'Customer Name': '', 'Total Amount': 'not-a-number' }
        ];
        const { validInvoices, errors } = validateInvoices(invoices);
        assert.equal(validInvoices.length, 1);
        assert.equal(errors.length, 1);
    });

    it('should convert invoices to JSON', () => {
        const invoices = [
            { 'Invoice Number': 'INV001', 'Date': '2023-01-01', 'Customer Name': 'John', 'Total Amount': '100.00' }
        ];
        const jsonInvoices = convertToJSON(invoices);
        assert.equal(jsonInvoices[0].invoiceNumber, 'INV001');
    });
});
