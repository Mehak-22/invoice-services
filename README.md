# Invoice Upload and Validation Service

This is a Node.js service that processes CSV/Excel files containing invoice data, validates them, and prepares them for further processing. It includes file upload functionality, invoice validation, and the ability to parse and process invoices with multiple line items.

## Features
- File upload endpoint (supports CSV and Excel files).
- File parsing (CSV and Excel formats).
- Invoice data validation:
  - Required fields are present.
  - Date formats are correct.
  - Numeric values are valid.
  - Invoice numbers are unique.
- Error reporting for invalid rows.
- JSON conversion for valid rows.
- Simulated invoice creation.
- Error handling throughout the process.
- Unit tests for validation and JSON conversion.

## Prerequisites

- [Node.js](https://nodejs.org/) installed.
- [Git](https://git-scm.com/) installed.
- A package manager like `npm`.

## Setup Instructions

### 1. Clone the Repository
First, clone the repository to your local machine:

```bash
git clone https://github.com/your-username/invoice-service.git
cd invoice-service

## Install Dependecies
npm install

node app.js

The application will run on http://localhost:3000.

API Endpoints
Upload Invoice File
URL: /invoices/upload
Method: POST
Content-Type: multipart/form-data
Body: A CSV or Excel file with the following structure:

## Sample CSV file
Invoice Number,Date,Customer Name,Total Amount,Item Description,Item Quantity,Item Price,Item Total
INV001,2023-01-01,John Doe,150.00,Product A,2,50.00,100.00
INV002,2023-02-15,Jane Doe,200.00,Product B,1,200.00,200.00

Response:
.On success, the API returns the processed invoices in JSON format along with any validation errors.
{
    "success": true,
    "processedInvoices": [
        {
            "invoiceNumber": "INV001",
            "date": "2023-01-01",
            "customerName": "John",
            "totalAmount": 150,
            "items": [
                {
                    "description": " Product A",
                    "quantity": 2,
                    "price": 50,
                    "total": 100
                }
            ]
        },
        {
            "invoiceNumber": "INV002",
            "date": "2023-02-15",
            "customerName": "Sam",
            "totalAmount": 200,
            "items": [
                {
                    "description": "Product B",
                    "quantity": 1,
                    "price": 200,
                    "total": 200
                }
            ]
        }
    ],
    "errors": []
}

.If there are validation errors:
{
  "success": true,
  "processedInvoices": [],
  "errors": [
    {
      "row": 1,
      "errors": ["Invoice number is required", "Total amount must be a number"]
    }
  ]
}

## Validation Rules 
1. Required Fields: Invoice Number, Date, Customer Name, Total Amount.
2. Date Format: Must be a valid date (YYYY-MM-DD).
3. Numeric Fields: Total Amount, Item Quantity, Item Price, and Item Total must be numbers.
4. Unique Invoice Numbers: Each invoice number must be unique.

Unit Testing
Unit tests are provided for the validation and JSON conversion logic. To run the tests:
npx mocha test/invoiceTest.js

invoice-service/
│
├── controllers/
│   └── invoiceController.js   # Handles the upload and processing logic
│
├── services/
│   └── fileService.js         # Handles file parsing for CSV and Excel files
│   └── invoiceService.js      # Contains validation, JSON conversion, and invoice creation simulation
│
├── routes/
│   └── invoiceRoutes.js       # Defines the API routes
│
├── uploads/                   # Temporary folder for uploaded files
│
├── test/
│   └── invoiceTest.js         # Unit tests for validation and processing
│
├── app.js                     # Main Express server file
├── package.json               # Node.js dependencies
└── README.md                  # Project documentation

Assumptions
1. The input file is in CSV or Excel format and follows the required structure.
2. Dates are in the YYYY-MM-DD format.
3. Numeric fields must be valid numbers, otherwise, they are flagged as errors.