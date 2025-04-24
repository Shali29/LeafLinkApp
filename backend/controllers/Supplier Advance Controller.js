const SupplierAdvance = require('../models/supplierAdvance');

// Get all supplier advances
exports.getAllAdvances = async (req, res) => {
  try {
    const advances = await SupplierAdvance.getAll();
    res.status(200).json(advances);
  } catch (error) {
    console.error('Error fetching supplier advances:', error);
    res.status(500).json({ message: 'Error fetching supplier advances', error: error.message });
  }
};

// Get supplier advances by supplier ID
exports.getAdvancesBySupplier = async (req, res) => {
  try {
    const advances = await SupplierAdvance.getBySupplierId(req.params.supplierId);
    if (advances.length === 0) {
      return res.status(404).json({ message: 'No advances found for this supplier' });
    }
    res.status(200).json(advances);
  } catch (error) {
    console.error('Error fetching supplier advances:', error);
    res.status(500).json({ message: 'Error fetching supplier advances', error: error.message });
  }
};

// Get a single advance by ID
exports.getAdvanceById = async (req, res) => {
  try {
    const advance = await SupplierAdvance.getById(req.params.id);
    if (!advance) {
      return res.status(404).json({ message: 'Advance not found' });
    }
    res.status(200).json(advance);
  } catch (error) {
    console.error('Error fetching advance:', error);
    res.status(500).json({ message: 'Error fetching advance', error: error.message });
  }
};

// Create a new advance
exports.createAdvance = async (req, res) => {
  try {
    const { S_RegisterID, Advance_Amount, Date, Status } = req.body;

    if (!S_RegisterID || !Advance_Amount) {
      return res.status(400).json({ message: 'Supplier ID and Advance Amount are required' });
    }

    const newAdvance = await SupplierAdvance.create({
      S_RegisterID,
      Advance_Amount,
      Date: Date || new Date(),
      Status: Status || 'Pending'
    });

    res.status(201).json(newAdvance);
  } catch (error) {
    console.error('Error creating advance:', error);
    res.status(500).json({ message: 'Error creating advance', error: error.message });
  }
};

// Update an advance
exports.updateAdvance = async (req, res) => {
  try {
    const advance = await SupplierAdvance.getById(req.params.id);
    if (!advance) {
      return res.status(404).json({ message: 'Advance not found' });
    }

    const updatedAdvance = await SupplierAdvance.update(req.params.id, req.body);
    res.status(200).json(updatedAdvance);
  } catch (error) {
    console.error('Error updating advance:', error);
    res.status(500).json({ message: 'Error updating advance', error: error.message });
  }
};

// Delete an advance
exports.deleteAdvance = async (req, res) => {
  try {
    const advance = await SupplierAdvance.getById(req.params.id);
    if (!advance) {
      return res.status(404).json({ message: 'Advance not found' });
    }

    await SupplierAdvance.delete(req.params.id);
    res.status(200).json({ message: 'Advance deleted successfully' });
  } catch (error) {
    console.error('Error deleting advance:', error);
    res.status(500).json({ message: 'Error deleting advance', error: error.message });
  }
};

// Update advance status
exports.updateAdvanceStatus = async (req, res) => {
  try {
    const { Status } = req.body;
    if (!Status || !['Pending', 'Transfered'].includes(Status)) {
      return res.status(400).json({ message: 'Valid status (Pending or Transfered) is required' });
    }

    const advance = await SupplierAdvance.getById(req.params.id);
    if (!advance) {
      return res.status(404).json({ message: 'Advance not found' });
    }

    const updatedAdvance = await SupplierAdvance.updateStatus(req.params.id, Status);
    res.status(200).json(updatedAdvance);
  } catch (error) {
    console.error('Error updating advance status:', error);
    res.status(500).json({ message: 'Error updating advance status', error: error.message });
  }
};

// Get advance statistics
exports.getAdvanceStatistics = async (req, res) => {
  try {
    const stats = await SupplierAdvance.getStatistics();
    res.status(200).json(stats);
  } catch (error) {
    console.error('Error fetching advance statistics:', error);
    res.status(500).json({ message: 'Error fetching advance statistics', error: error.message });
  }
};
