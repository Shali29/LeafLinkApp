import express from 'express';
import {getAllPayments} from '../controllers/SupplierPaymentsController.js';
import {getPaymentsBySupplier} from '../controllers/SupplierPaymentsController.js';   
import {getPaymentById} from '../controllers/SupplierPaymentsController.js'; 
import { createPayment } from '../controllers/SupplierPaymentsController.js';
import { updatePayment } from '../controllers/SupplierPaymentsController.js';
import { deletePayment } from '../controllers/SupplierPaymentsController.js';
import { updatePaymentStatus } from '../controllers/SupplierPaymentsController.js';
import { calculatePayment } from '../controllers/SupplierPaymentsController.js';
import { getPaymentStatistics } from '../controllers/SupplierPaymentsController.js';
const router = express.Router();

// GET all payments
router.get('/', getAllPayments);

// GET payments by supplier ID
router.get('/supplier/:supplierId', getPaymentsBySupplier);

// GET payment by ID
router.get('/:id', getPaymentById);

// POST create new payment
router.post('/', createPayment);

// PUT update payment
router.put('/:id', updatePayment);

// DELETE payment
router.delete('/:id', deletePayment);

// PUT update payment status
router.put('/:id/status', updatePaymentStatus);

// GET calculate payment for supplier
router.get('/calculate/:supplierId', calculatePayment);

// GET payment statistics
router.get('/stats/summary', getPaymentStatistics);

export default router;
