import express from 'express';
import supplierLoanController from '../controllers/SupplierLoanController.js';

const router = express.Router();

// GET all loans
router.get('/', supplierLoanController.getAllLoans);

// GET loans by supplier ID
router.get('/supplier/:supplierId', supplierLoanController.getLoansBySupplier);

// GET loan by ID
router.get('/:id', supplierLoanController.getLoanById);

// POST create new loan
router.post('/', supplierLoanController.createLoan);

// PUT update loan
router.put('/:id', supplierLoanController.updateLoan);

// DELETE loan
router.delete('/:id', supplierLoanController.deleteLoan);

// GET loan statistics
router.get('/stats/summary', supplierLoanController.getLoanStatistics);

export default router;
