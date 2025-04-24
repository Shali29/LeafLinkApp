import Loan from '../models/loan.js';

// Get all supplier loans
export const getAllLoans = async (req, res) => {
  try {
    const loans = await Loan.getAll();
    res.status(200).json(loans);
  } catch (error) {
    console.error('Error fetching supplier loans:', error);
    res.status(500).json({ message: 'Error fetching supplier loans', error: error.message });
  }
};

// Get loans by supplier ID
export const getLoansBySupplier = async (req, res) => {
  try {
    const loans = await Loan.getBySupplier(req.params.supplierId);
    if (loans.length === 0) {
      return res.status(404).json({ message: 'No loans found for this supplier' });
    }
    res.status(200).json(loans);
  } catch (error) {
    console.error('Error fetching supplier loans:', error);
    res.status(500).json({ message: 'Error fetching supplier loans', error: error.message });
  }
};

// Get loan by ID
export const getLoanById = async (req, res) => {
  try {
    const loan = await Loan.getById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.status(200).json(loan);
  } catch (error) {
    console.error('Error fetching loan:', error);
    res.status(500).json({ message: 'Error fetching loan', error: error.message });
  }
};

// Create a new loan
export const createLoan = async (req, res) => {
  try {
    const loanData = req.body;

    if (!loanData.S_RegisterID || !loanData.Loan_Amount) {
      return res.status(400).json({ message: 'Supplier ID and Loan Amount are required' });
    }

    const newLoan = await Loan.create(loanData);
    res.status(201).json(newLoan);
  } catch (error) {
    console.error('Error creating loan:', error);
    res.status(500).json({ message: 'Error creating loan', error: error.message });
  }
};

// Update a loan
export const updateLoan = async (req, res) => {
  try {
    const updated = await Loan.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    const updatedLoan = await Loan.getById(req.params.id);
    res.status(200).json(updatedLoan);
  } catch (error) {
    console.error('Error updating loan:', error);
    res.status(500).json({ message: 'Error updating loan', error: error.message });
  }
};

// Delete a loan
export const deleteLoan = async (req, res) => {
  try {
    const deleted = await Loan.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.status(200).json({ message: 'Loan deleted successfully' });
  } catch (error) {
    console.error('Error deleting loan:', error);
    res.status(500).json({ message: 'Error deleting loan', error: error.message });
  }
};

// Get loan statistics
export const getLoanStatistics = async (req, res) => {
  try {
    const stats = await Loan.getStatistics();
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching loan statistics:', error);
    res.status(500).json({ message: 'Error fetching loan statistics', error: error.message });
  }
};
