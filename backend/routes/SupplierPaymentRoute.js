import SupplierPaymentsModel from '../models/SupplierPaymentsModel.js';

// GET all payments
export const getAllPayments = async (req, res) => {
  try {
    const payments = await SupplierPaymentsModel.getAll();
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments', error: error.message });
  }
};

// GET payments by supplier ID
export const getPaymentsBySupplier = async (req, res) => {
  try {
    const supplierId = req.params.PaymentsBySupplier;
    const payments = await SupplierPaymentsModel.getBySupplierId(supplierId);
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payments for supplier', error: error.message });
  }
};

// GET payment by ID
export const getPaymentById = async (req, res) => {
  try {
    const paymentId = req.params.PaymentById;
    const payment = await SupplierPaymentsModel.getById(paymentId);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payment', error: error.message });
  }
};

// POST create new payment
export const createPayment = async (req, res) => {
  try {
    const result = await SupplierPaymentsModel.create(req.body);
    res.status(201).json({ message: 'Payment created successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create payment', error: error.message });
  }
};

// PUT update payment
export const updatePayment = async (req, res) => {
  try {
    const paymentId = req.params.updatePayment;
    const result = await SupplierPaymentsModel.update(paymentId, req.body);
    res.status(200).json({ message: 'Payment updated successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update payment', error: error.message });
  }
};

// DELETE payment
export const deletePayment = async (req, res) => {
  try {
    const paymentId = req.params.deletePayment;
    const result = await SupplierPaymentsModel.delete(paymentId);
    res.status(200).json({ message: 'Payment deleted successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete payment', error: error.message });
  }
};

// PUT update payment status
export const updatePaymentStatus = async (req, res) => {
  try {
    const paymentId = req.params.updatePaymentStatus;
    const { status } = req.body;
    const result = await SupplierPaymentsModel.updateStatus(paymentId, status);
    res.status(200).json({ message: 'Payment status updated successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update payment status', error: error.message });
  }
};

// GET calculate payment for supplier
export const calculatePayment = async (req, res) => {
  try {
    const supplierId = req.params.calculatePayment;
    const data = await SupplierPaymentsModel.calculatePaymentData(supplierId);
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Failed to calculate payment', error: error.message });
  }
};

// GET payment statistics (example: total payments)
export const getPaymentStatistics = async (req, res) => {
  try {
    const payments = await SupplierPaymentsModel.getAll();
    const totalPayments = payments.length;
    res.status(200).json({ totalPayments });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch payment statistics', error: error.message });
  }
};
