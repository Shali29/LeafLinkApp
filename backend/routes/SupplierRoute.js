// router.js
import express from 'express';
import db from '../config/db.js';
import bcrypt from 'bcrypt';

const router = express.Router();

// --- Model inside router ---
class SupplierModel {
  static async getAll() {
    try {
      const [results] = await db.query('SELECT S_RegisterID, S_FullName, S_Address, S_ContactNo, Email FROM Supplier');
      return results;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [results] = await db.query('SELECT S_RegisterID, S_FullName, S_Address, S_ContactNo, Email, AccountNumber, BankName, Branch FROM Supplier WHERE S_RegisterID = ?', [id]);
      return results.length === 0 ? null : results[0];
    } catch (error) {
      throw error;
    }
  }

  static async create(supplierData) {
    try {
      const hashedPassword = await bcrypt.hash(supplierData.password, 10);
      const query = `
        INSERT INTO Supplier (
          S_RegisterID, S_FullName, S_Address, S_ContactNo, 
          AccountNumber, BankName, Branch, Email, Username, hash_Password
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const [result] = await db.query(query, [
        supplierData.S_RegisterID,
        supplierData.S_FullName,
        supplierData.S_Address,
        supplierData.S_ContactNo,
        supplierData.AccountNumber,
        supplierData.BankName,
        supplierData.Branch,
        supplierData.Email,
        supplierData.Username,
        hashedPassword
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, supplierData) {
    try {
      const query = `
        UPDATE Supplier SET 
          S_FullName = ?, 
          S_Address = ?, 
          S_ContactNo = ?, 
          AccountNumber = ?, 
          BankName = ?, 
          Branch = ?, 
          Email = ? 
        WHERE S_RegisterID = ?
      `;
      const [result] = await db.query(query, [
        supplierData.S_FullName,
        supplierData.S_Address,
        supplierData.S_ContactNo,
        supplierData.AccountNumber,
        supplierData.BankName,
        supplierData.Branch,
        supplierData.Email,
        id
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM Supplier WHERE S_RegisterID = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async authenticate(username, password) {
    try {
      const [results] = await db.query('SELECT S_RegisterID, Username, hash_Password FROM Supplier WHERE Username = ?', [username]);
      if (results.length === 0) return null;
      
      const supplier = results[0];
      const match = await bcrypt.compare(password, supplier.hash_Password);
      if (match) {
        delete supplier.hash_Password;
        return supplier;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

// --- Route handlers inside router ---

// GET all suppliers
router.get('/AllSuppliers', async (req, res) => {
  try {
    const suppliers = await SupplierModel.getAll();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error('Error fetching suppliers:', error);
    res.status(500).json({ message: 'Error fetching suppliers', error: error.message });
  }
});

// GET supplier by ID
router.get('/SupplierById/:id', async (req, res) => {
  try {
    const supplier = await SupplierModel.getById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    console.error('Error fetching supplier:', error);
    res.status(500).json({ message: 'Error fetching supplier', error: error.message });
  }
});

// POST create new supplier
router.post('/createSupplier', async (req, res) => {
  try {
    const { S_RegisterID, S_FullName, S_Address, S_ContactNo, AccountNumber, BankName, Branch, Email, Username, password } = req.body;
    if (!S_RegisterID || !S_FullName || !S_Address || !S_ContactNo || !AccountNumber || !BankName || !Branch || !Email || !Username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    await SupplierModel.create(req.body);
    res.status(201).json({ message: 'Supplier created successfully' });
  } catch (error) {
    console.error('Error creating supplier:', error);
    res.status(500).json({ message: 'Error creating supplier', error: error.message });
  }
});

// PUT update supplier
router.put('/updateSupplier/:id', async (req, res) => {
  try {
    const supplier = await SupplierModel.getById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    await SupplierModel.update(req.params.id, req.body);
    res.status(200).json({ message: 'Supplier updated successfully' });
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).json({ message: 'Error updating supplier', error: error.message });
  }
});

// DELETE supplier
router.delete('/deleteSupplier/:id', async (req, res) => {
  try {
    const supplier = await SupplierModel.getById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }

    await SupplierModel.delete(req.params.id);
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error('Error deleting supplier:', error);
    res.status(500).json({ message: 'Error deleting supplier', error: error.message });
  }
});

// POST login supplier
router.post('/loginSupplier', async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }

    const supplier = await SupplierModel.authenticate(username, password);
    if (!supplier) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }

    res.status(200).json({ message: 'Login successful', supplier });
  } catch (error) {
    console.error('Error logging in supplier:', error);
    res.status(500).json({ message: 'Error logging in supplier', error: error.message });
  }
});

export default router;
