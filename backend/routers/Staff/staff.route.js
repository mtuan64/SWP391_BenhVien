const express = require('express');
const staffRouter = express.Router();
const { getAllServices, createService, deleteService, getServiceById, updateService } = require('../../controller/staff/servicesControlelr');
// const { createCheckup, LabTestbyProfileId } = require('../../controller/staff/checkUpServices');
const { createMedicalRecord, allMedicalRecord, editMedicalRecord, createProfile, getAllProfiles } = require('../../controller/staff/medicalRecordController');
const paymentController = require('../../controller/staff/PaymentController');
const doctorServices = require('../../controller/doctor/doctorService');
const invoiceController = require('../../controller/staff/InvoiceController');
staffRouter.post('/create-payment-link', paymentController.createPaymentLink);
staffRouter.post('/webhook', paymentController.handleWebhook);
staffRouter.get('/success/:paymentId', paymentController.paymentSuccess);
staffRouter.get('/cancel', paymentController.paymentCancel);
staffRouter.get('/medical-records', getAllProfiles);
staffRouter.post('/medical-record', createProfile);
staffRouter.put('/medical-records/:id', editMedicalRecord);
staffRouter.get('/invoices', invoiceController.getAllInvoices);
staffRouter.get('/services/:invoiceId', invoiceController.getServices);
staffRouter.post('/invoices', invoiceController.CreateInvoices);
staffRouter.put('/services/paid/:invoiceId', paymentController.paidServices);
staffRouter.delete('/services/delete/:invoiceId', paymentController.deleteInvoice);
staffRouter.get('/payments', paymentController.getPayments);
staffRouter.get("/payments/summary", paymentController.getPaymentSummary);
staffRouter.get("/services", invoiceController.getAllServices);
staffRouter.get("/profiles/:userId", invoiceController.getProfilesByUserId)
staffRouter.get('/doctors', doctorServices.getAllDoctors);
staffRouter.get('/:userId/profiles', doctorServices.getProfilesByUserId);

// Services routes
staffRouter.get('/all/services', getAllServices); // GET /api/staff/services - Get all services with pagination, sorting, search
staffRouter.get('/get/services/:id', getServiceById); // GET /api/staff/services/:id - Get a single service by ID
staffRouter.post('/create/services', createService); // POST /api/staff/services - Create a new service
staffRouter.put('/update/services/:id', updateService); // PUT /api/staff/services/:id - Update a service
staffRouter.delete('/delete/services/:id', deleteService); // DELETE /api/staff/services/:id - Delete a service
// staffRouter.get('/labtestresult/:profileId', LabTestbyProfileId);
module.exports = staffRouter;