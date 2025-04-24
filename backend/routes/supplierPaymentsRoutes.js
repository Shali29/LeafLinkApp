import express from 'express';
import supplierPaymentsController from '../controllers/SupplierPaymentsController.js';

const router = express.Router();

// GET all payments
router.get('/', supplierPaymentsController.getAllPayments);

// GET payments by supplier ID
router.get('/supplier/:supplierId', supplierPaymentsController.getPaymentsBySupplier);

// GET payment by ID
router.get('/:id', supplierPaymentsController.getPaymentById);

// POST create new payment
router.post('/', supplierPaymentsController.createPayment);

// PUT update payment
router.put('/:id', supplierPaymentsController.updatePayment);

// DELETE payment
router.delete('/:id', supplierPaymentsController.deletePayment);

// PUT update payment status
router.put('/:id/status', supplierPaymentsController.updatePaymentStatus);

// GET calculate payment for supplier
router.get('/calculate/:supplierId', supplierPaymentsController.calculatePayment);

// GET payment statistics
router.get('/stats/summary', supplierPaymentsController.getPaymentStatistics);

export default router;
