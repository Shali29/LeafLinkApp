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
router.get('/:AllPayments', getAllPayments);

// GET payments by supplier ID
router.get('/:PaymentsBySupplier', getPaymentsBySupplier);

// GET payment by ID
router.get('/:PaymentById', getPaymentById);

// POST create new payment
router.post('/:createPayment', createPayment);

// PUT update payment
router.put('/:updatePayment', updatePayment);

// DELETE payment
router.delete('/:deletePayment', deletePayment);

// PUT update payment status
router.put('/:updatePaymentStatus', updatePaymentStatus);

// GET calculate payment for supplier
router.get('/:calculatePayment', calculatePayment);

// GET payment statistics
router.get('/:PaymentStatistics', getPaymentStatistics);

export default router;
