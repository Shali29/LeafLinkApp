import SupplierLoanModel from '../models/SupplierLoanModel.js';

// GET all loans
export const getAllLoans = async (req, res) => {
  try {
    const loans = await SupplierLoanModel.getAll();
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch loans', error: error.message });
  }
};

// GET loans by supplier ID
export const getLoansBySupplier = async (req, res) => {
  try {
    const supplierId = req.params.LoansBySupplier;
    const loans = await SupplierLoanModel.getBySupplierId(supplierId);
    res.status(200).json(loans);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch loans for supplier', error: error.message });
  }
};

// GET loan by ID
export const getLoanById = async (req, res) => {
  try {
    const loanId = req.params.LoanById;
    const loan = await SupplierLoanModel.getById(loanId);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.status(200).json(loan);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch loan', error: error.message });
  }
};

// POST create new loan
export const createLoan = async (req, res) => {
  try {
    const result = await SupplierLoanModel.create(req.body);
    res.status(201).json({ message: 'Loan created successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create loan', error: error.message });
  }
};

// PUT update loan
export const updateLoan = async (req, res) => {
  try {
    const loanId = req.params.updateLoan;
    const result = await SupplierLoanModel.update(loanId, req.body);
    res.status(200).json({ message: 'Loan updated successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update loan', error: error.message });
  }
};

// DELETE loan
export const deleteLoan = async (req, res) => {
  try {
    const loanId = req.params.deleteLoan;
    const result = await SupplierLoanModel.delete(loanId);
    res.status(200).json({ message: 'Loan deleted successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete loan', error: error.message });
  }
};

// GET loan statistics (example: total loans)
export const getLoanStatistics = async (req, res) => {
  try {
    const loans = await SupplierLoanModel.getAll();
    const totalLoans = loans.length;
    res.status(200).json({ totalLoans });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch loan statistics', error: error.message });
  }
};
