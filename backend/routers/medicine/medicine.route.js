const express = require('express');
const router = express.Router();

const { getAllInvoices, createInvoice } = require('../../controller/medicine/medServices');

// Route xử lý GET /invoices
router.get('/invoices', getAllInvoices);
router.post('/invoices', createInvoice);

module.exports = router;
