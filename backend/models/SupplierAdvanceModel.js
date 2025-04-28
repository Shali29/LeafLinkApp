import db from '../config/db.js'; 

class SupplierAdvanceModel {
  // Fetch all supplier advances with supplier name
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

  // Fetch a supplier advance by its ID
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

  // Fetch all advances for a specific supplier
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

  // Create a new supplier advance
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

  // Update the status of a supplier advance
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

  // Update an existing supplier advance
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

  // Delete a supplier advance by its ID
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM Supplier_Advance WHERE AdvanceID = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default SupplierAdvanceModel;
