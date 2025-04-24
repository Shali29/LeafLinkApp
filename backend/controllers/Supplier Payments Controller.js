import SupplierPayment from '../models/supplierPayment.js';

export const getAllPayments = async (req, res) => {
  try {
    const payments = await SupplierPayment.getAll();
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching supplier payments:', error);
    res.status(500).json({ message: 'Error fetching supplier payments', error: error.message });
  }
};

export const getPaymentsBySupplier = async (req, res) => {
  try {
    const payments = await SupplierPayment.getBySupplierId(req.params.supplierId);
    if (payments.length === 0) {
      return res.status(404).json({ message: 'No payments found for this supplier' });
    }
    res.status(200).json(payments);
  } catch (error) {
    console.error('Error fetching supplier payments:', error);
    res.status(500).json({ message: 'Error fetching supplier payments', error: error.message });
  }
};

export const getPaymentById = async (req, res) => {
  try {
    const payment = await SupplierPayment.getById(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error('Error fetching payment:', error);
    res.status(500).json({ message: 'Error fetching payment', error: error.message });
  }
};

export const createPayment = async (req, res) => {
  try {
    const newPayment = await SupplierPayment.create(req.body);
    res.status(201).json(newPayment);
  } catch (error) {
    console.error('Error creating payment:', error);
    res.status(500).json({ message: 'Error creating payment', error: error.message });
  }
};

export const updatePayment = async (req, res) => {
  try {
    const updated = await SupplierPayment.update(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Payment not found or update failed' });
    }
    const payment = await SupplierPayment.getById(req.params.id);
    res.status(200).json(payment);
  } catch (error) {
    console.error('Error updating payment:', error);
    res.status(500).json({ message: 'Error updating payment', error: error.message });
  }
};

export const deletePayment = async (req, res) => {
  try {
    const deleted = await SupplierPayment.delete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.status(200).json({ message: 'Payment deleted successfully' });
  } catch (error) {
    console.error('Error deleting payment:', error);
    res.status(500).json({ message: 'Error deleting payment', error: error.message });
  }
};

export const updatePaymentStatus = async (req, res) => {
  try {
    const updated = await SupplierPayment.updateStatus(req.params.id, req.body.Status);
    if (!updated) {
      return res.status(400).json({ message: 'Failed to update payment status' });
    }
    const payment = await SupplierPayment.getById(req.params.id);
    res.status(200).json(payment);
  } catch (error) {
    console.error('Error updating payment status:', error);
    res.status(500).json({ message: 'Error updating payment status', error: error.message });
  }
};

export const calculatePayment = async (req, res) => {
  try {
    const result = await SupplierPayment.calculate(req.params.supplierId);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error calculating payment:', error);
    res.status(500).json({ message: 'Error calculating payment', error: error.message });
  }
};

export const getPaymentStatistics = async (req, res) => {
  try {
    const stats = await SupplierPayment.getStatistics();
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching payment statistics:', error);
    res.status(500).json({ message: 'Error fetching payment statistics', error: error.message });
  }
};
