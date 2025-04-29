// router.js
import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// --- Model inside router ---
class SupplierAdvanceModel {
  static async getAll() {
    try {
      const [results] = await db.query(`
        SELECT sa.*, s.S_FullName 
        FROM Supplier_Advance sa
        JOIN Supplier s ON sa.S_RegisterID = s.S_RegisterID
        ORDER BY sa.Date DESC
      `);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [results] = await db.query(`
        SELECT sa.*, s.S_FullName 
        FROM Supplier_Advance sa
        JOIN Supplier s ON sa.S_RegisterID = s.S_RegisterID
        WHERE sa.AdvanceID = ?
      `, [id]);
      return results.length === 0 ? null : results[0];
    } catch (error) {
      throw error;
    }
  }

  static async getBySupplierId(supplierId) {
    try {
      const [results] = await db.query(`
        SELECT * FROM Supplier_Advance 
        WHERE S_RegisterID = ?
        ORDER BY Date DESC
      `, [supplierId]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async create(advanceData) {
    try {
      const query = `
        INSERT INTO Supplier_Advance (
          S_RegisterID, Advance_Amount, Date, Status
        ) VALUES (?, ?, CURDATE(), ?)
      `;
      const [result] = await db.query(query, [
        advanceData.S_RegisterID,
        advanceData.Advance_Amount,
        advanceData.Status || 'Pending'
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async updateStatus(id, status) {
    try {
      const [result] = await db.query(
        'UPDATE Supplier_Advance SET Status = ? WHERE AdvanceID = ?',
        [status, id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, advanceData) {
    try {
      const query = `
        UPDATE Supplier_Advance SET 
          S_RegisterID = ?, 
          Advance_Amount = ?, 
          Date = ?, 
          Status = ?
        WHERE AdvanceID = ?
      `;
      const [result] = await db.query(query, [
        advanceData.S_RegisterID,
        advanceData.Advance_Amount,
        advanceData.Date || new Date().toISOString().split('T')[0],
        advanceData.Status,
        id
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM Supplier_Advance WHERE AdvanceID = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

// --- Route handlers inside router ---

// GET all advances
router.get('/AllAdvances', async (req, res) => {
  try {
    const advances = await SupplierAdvanceModel.getAll();
    res.status(200).json(advances);
  } catch (error) {
    console.error('Error fetching advances:', error);
    res.status(500).json({ message: 'Error fetching advances', error: error.message });
  }
});

// GET advances by supplier ID
router.get('/AdvancesBySupplier/:supplierId', async (req, res) => {
  try {
    const advances = await SupplierAdvanceModel.getBySupplierId(req.params.supplierId);
    res.status(200).json(advances);
  } catch (error) {
    console.error('Error fetching supplier advances:', error);
    res.status(500).json({ message: 'Error fetching supplier advances', error: error.message });
  }
});

// GET advance by ID
router.get('/AdvanceById/:id', async (req, res) => {
  try {
    const advance = await SupplierAdvanceModel.getById(req.params.id);
    if (!advance) {
      return res.status(404).json({ message: 'Advance not found' });
    }
    res.status(200).json(advance);
  } catch (error) {
    console.error('Error fetching advance:', error);
    res.status(500).json({ message: 'Error fetching advance', error: error.message });
  }
});

// POST create new advance
router.post('/createAdvance', async (req, res) => {
  try {
    const { S_RegisterID, Advance_Amount, Status } = req.body;
    if (!S_RegisterID || !Advance_Amount) {
      return res.status(400).json({ message: 'S_RegisterID and Advance_Amount are required' });
    }

    await SupplierAdvanceModel.create(req.body);
    res.status(201).json({ message: 'Advance created successfully' });
  } catch (error) {
    console.error('Error creating advance:', error);
    res.status(500).json({ message: 'Error creating advance', error: error.message });
  }
});

// PUT update advance
router.put('/updateAdvance/:id', async (req, res) => {
  try {
    const advance = await SupplierAdvanceModel.getById(req.params.id);
    if (!advance) {
      return res.status(404).json({ message: 'Advance not found' });
    }

    await SupplierAdvanceModel.update(req.params.id, req.body);
    res.status(200).json({ message: 'Advance updated successfully' });
  } catch (error) {
    console.error('Error updating advance:', error);
    res.status(500).json({ message: 'Error updating advance', error: error.message });
  }
});

// DELETE advance
router.delete('/deleteAdvance/:id', async (req, res) => {
  try {
    const advance = await SupplierAdvanceModel.getById(req.params.id);
    if (!advance) {
      return res.status(404).json({ message: 'Advance not found' });
    }

    await SupplierAdvanceModel.delete(req.params.id);
    res.status(200).json({ message: 'Advance deleted successfully' });
  } catch (error) {
    console.error('Error deleting advance:', error);
    res.status(500).json({ message: 'Error deleting advance', error: error.message });
  }
});

// PUT update advance status
router.put('/updateAdvanceStatus/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const advance = await SupplierAdvanceModel.getById(req.params.id);
    if (!advance) {
      return res.status(404).json({ message: 'Advance not found' });
    }

    await SupplierAdvanceModel.updateStatus(req.params.id, status);
    res.status(200).json({ message: 'Advance status updated successfully' });
  } catch (error) {
    console.error('Error updating advance status:', error);
    res.status(500).json({ message: 'Error updating advance status', error: error.message });
  }
});

// GET advance statistics (Dummy for now)
router.get('/AdvanceStatistics', async (req, res) => {
  try {
    // Since getAdvanceStatistics not defined in the model, sending a dummy response
    res.status(200).json({ message: 'Advance statistics feature not implemented yet.' });
  } catch (error) {
    console.error('Error fetching advance statistics:', error);
    res.status(500).json({ message: 'Error fetching advance statistics', error: error.message });
  }
});

export default router;
