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
router.get('/:AllLoans', getAllLoans);

// GET loans by supplier ID
router.get('/:LoansBySupplier', getLoansBySupplier);

// GET loan by ID
router.get('/:LoanById', getLoanById);

// POST create new loan
router.post('/:createLoan', createLoan);

// PUT update loan
router.put('/:updateLoan', updateLoan);

// DELETE loan
router.delete('/:deleteLoan', deleteLoan);

// GET loan statistics
router.get('/:LoanStatistics', getLoanStatistics);

export default router;
