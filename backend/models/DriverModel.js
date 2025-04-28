import db from '../config/db.js'; 

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

export default DriverModel;
