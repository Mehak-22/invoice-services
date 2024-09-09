// Validate invoices
exports.validateInvoices = (invoices) => {
    let errors = [];
    let uniqueInvoiceNumbers = new Set();

    invoices.forEach((invoice, index) => {
        let invoiceErrors = [];

        // Required field checks
        if (!invoice['Invoice Number']) invoiceErrors.push('Invoice number is required');
        if (!invoice['Date']) invoiceErrors.push('Date is required');
        if (!invoice['Customer Name']) invoiceErrors.push('Customer name is required');
        if (!invoice['Total Amount']) invoiceErrors.push('Total amount is required');

        // Unique invoice number check
        if (uniqueInvoiceNumbers.has(invoice['Invoice Number'])) {
            invoiceErrors.push('Invoice number must be unique');
        } else {
            uniqueInvoiceNumbers.add(invoice['Invoice Number']);
        }

        // Numeric fields
        if (isNaN(invoice['Total Amount'])) invoiceErrors.push('Total amount must be a number');

        // Date validation
        if (isNaN(Date.parse(invoice['Date']))) invoiceErrors.push('Date format is invalid');

        // Add errors to invoice
        if (invoiceErrors.length > 0) {
            invoice['Errors'] = invoiceErrors.join(', ');
            errors.push({ row: index + 1, errors: invoiceErrors });
        }
    });

    return { validInvoices: invoices.filter(i => !i.Errors), errors };
};

// Convert valid invoices to JSON
exports.convertToJSON = (invoices) => {
    return invoices.map(invoice => ({
        invoiceNumber: invoice['Invoice Number'],
        date: invoice['Date'],
        customerName: invoice['Customer Name'],
        totalAmount: parseFloat(invoice['Total Amount']),
        items: [
            {
                description: invoice['Item Description'],
                quantity: parseInt(invoice['Item Quantity'], 10),
                price: parseFloat(invoice['Item Price']),
                total: parseFloat(invoice['Item Total'])
            }
        ]
    }));
};

// Simulate creating invoices
exports.createInvoice = (invoice) => {
    console.log('Creating invoice:', invoice);
};
