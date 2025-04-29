// router.js
import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// --- Model inside router ---
class DriverModel {
  static async getAll() {
    try {
      const [rows] = await db.query('SELECT * FROM Driver');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM Driver WHERE D_RegisterID = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

  static async create(driverData) {
    try {
      const query = `
        INSERT INTO Driver (
          D_RegisterID, D_FullName, D_ContactNumber, Email, VehicalNumber, Route, Serial_Code
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      const [result] = await db.query(query, [
        driverData.D_RegisterID,
        driverData.D_FullName,
        driverData.D_ContactNumber,
        driverData.Email,
        driverData.VehicalNumber,
        driverData.Route,
        driverData.Serial_Code,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async update(id, driverData) {
    try {
      const query = `
        UPDATE Driver SET 
          D_FullName = ?, 
          D_ContactNumber = ?, 
          Email = ?, 
          VehicalNumber = ?, 
          Route = ?, 
          Serial_Code = ?
        WHERE D_RegisterID = ?
      `;
      const [result] = await db.query(query, [
        driverData.D_FullName,
        driverData.D_ContactNumber,
        driverData.Email,
        driverData.VehicalNumber,
        driverData.Route,
        driverData.Serial_Code,
        id,
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM Driver WHERE D_RegisterID = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

// --- Route handlers inside router ---

// GET all drivers
router.get('/AllDrivers', async (req, res) => {
  try {
    const drivers = await DriverModel.getAll();
    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error fetching drivers:', error);
    res.status(500).json({ message: 'Error fetching drivers', error: error.message });
  }
});

// GET driver by ID
router.get('/DriverById/:id', async (req, res) => {
  try {
    const driver = await DriverModel.getById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    console.error('Error fetching driver:', error);
    res.status(500).json({ message: 'Error fetching driver', error: error.message });
  }
});

// POST create new driver
router.post('/createDriver', async (req, res) => {
  try {
    const { D_RegisterID, D_FullName, D_ContactNumber, Email, VehicalNumber, Route, Serial_Code } = req.body;
    if (!D_RegisterID || !D_FullName || !D_ContactNumber || !Email || !VehicalNumber || !Route || !Serial_Code) {
      return res.status(400).json({ message: 'All driver fields are required' });
    }

    await DriverModel.create(req.body);
    res.status(201).json({ message: 'Driver created successfully' });
  } catch (error) {
    console.error('Error creating driver:', error);
    res.status(500).json({ message: 'Error creating driver', error: error.message });
  }
});

// PUT update driver
router.put('/updateDriver/:id', async (req, res) => {
  try {
    const driver = await DriverModel.getById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    await DriverModel.update(req.params.id, req.body);
    res.status(200).json({ message: 'Driver updated successfully' });
  } catch (error) {
    console.error('Error updating driver:', error);
    res.status(500).json({ message: 'Error updating driver', error: error.message });
  }
});

// DELETE driver
router.delete('/deleteDriver/:id', async (req, res) => {
  try {
    const driver = await DriverModel.getById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    await DriverModel.delete(req.params.id);
    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    console.error('Error deleting driver:', error);
    res.status(500).json({ message: 'Error deleting driver', error: error.message });
  }
});

export default router;
