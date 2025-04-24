const SupplierLoan = require('../models/supplier-loan');

exports.getAllLoans = async (req, res) => {
  try {
    const loans = await SupplierLoan.getAll();
    res.status(200).json(loans);
  } catch (error) {
    console.error('Error getting loans:', error);
    res.status(500).json({ message: 'Error fetching loans', error: error.message });
  }
};

exports.getLoanById = async (req, res) => {
  try {
    const loan = await SupplierLoan.getById(req.params.id);
    if (!loan) {
      return res.status(404).json({ message: 'Loan not found' });
    }
    res.status(200).json(loan);
  } catch (error) {
    console.error('Error getting loan:', error);
    res.status(500).json({ message: 'Error fetching loan', error: error.message });
  }
};

exports.getLoansBySupplier = async (req, res) => {
  try {
    const loans = await SupplierLoan.getBySupplierId(req.params.supplierId);
    res.status(200).json(loans);
  } catch (error) {
    console.error('Error getting supplier loans:', error);
    res.status(500).json({ message: 'Error fetching supplier loans', error: error.message });
  }
};

exports.createLoan = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['S_RegisterID', 'Loan_Amount', 'Duration', 'PurposeOfLoan'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }
    
    await SupplierLoan.create(req.body);
    res.status(201).json({ message: 'Loan created successfully' });
  } catch (error) {
    console.error('Error creating loan:', error);
    res.status(500).json({ message: 'Error creating loan', error: error.message });
  }
};

exports.updateLoanStatus = async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }
    
    const loan = await SupplierLoan.getById(req.params.id);
    if (!loan) {
      