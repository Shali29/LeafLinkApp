import db from '../config/db.js'; 

class SupplierAdvance {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT sa.*, s.S_FullName 
        FROM Supplier_Advance sa
        JOIN Supplier s ON sa.S_RegisterID = s.S_RegisterID
        ORDER BY sa.Date DESC
      `, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT sa.*, s.S_FullName 
        FROM Supplier_Advance sa
        JOIN Supplier s ON sa.S_RegisterID = s.S_RegisterID
        WHERE sa.AdvanceID = ?
      `, [id], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);
        resolve(results[0]);
      });
    });
  }

  static getBySupplierId(supplierId) {
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT * FROM Supplier_Advance 
        WHERE S_RegisterID = ?
        ORDER BY Date DESC
      `, [supplierId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static create(advanceData) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Supplier_Advance (
          S_RegisterID, Advance_Amount, Date, Status
        ) VALUES (?, ?, CURDATE(), ?)
      `;
      
      db.query(
        query,
        [
          advanceData.S_RegisterID,
          advanceData.Advance_Amount,
          advanceData.Status || 'Pending'
        ],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }

  static updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE Supplier_Advance SET Status = ? WHERE AdvanceID = ?',
        [status, id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }

  static update(id, advanceData) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE Supplier_Advance SET 
          S_RegisterID = ?, 
          Advance_Amount = ?, 
          Date = ?, 
          Status = ?
        WHERE AdvanceID = ?
      `;
      
      db.query(
        query,
        [
          advanceData.S_RegisterID,
          advanceData.Advance_Amount,
          advanceData.Date || new Date().toISOString().split('T')[0],
          advanceData.Status,
          id
        ],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Supplier_Advance WHERE AdvanceID = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

export default SupplierAdvance;
