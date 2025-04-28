import express from 'express';
import {getAllLoans} from '../controllers/SupplierLoanController.js';
import {getLoansBySupplier} from '../controllers/SupplierLoanController.js';
import {getLoanById} from '../controllers/SupplierLoanController.js';
import { createLoan } from '../controllers/SupplierLoanController.js';
import { updateLoan } from '../controllers/SupplierLoanController.js';
import { deleteLoan } from '../controllers/SupplierLoanController.js';
import { getLoanStatistics } from '../controllers/SupplierLoanController.js';

const router = express.Router();

// GET all loans
router.get('/', getAllLoans);

// GET loans by supplier ID
router.get('/supplier/:supplierId', getLoansBySupplier);

// GET loan by ID
router.get('/:id', getLoanById);

// POST create new loan
router.post('/', createLoan);

// PUT update loan
router.put('/:id', updateLoan);

// DELETE loan
router.delete('/:id', deleteLoan);

// GET loan statistics
router.get('/stats/summary', getLoanStatistics);

export default router;
