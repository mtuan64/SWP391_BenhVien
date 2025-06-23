const express = require('express');
const verifyToken = require('../../middleware/verifyToken');
const userRouter = express.Router();
const { createPaymentLinkEmbedded } = require('../../controller/staff/PaymentController');
const { getAllInvoices4User, CompletedInvoices } = require('../../controller/staff/InvoiceController');
userRouter.get('/invoices', verifyToken, getAllInvoices4User);
userRouter.post('/create-link', createPaymentLinkEmbedded);
userRouter.put('/pay/success', CompletedInvoices);
module.exports = userRouter;