const db = require('../config/database');

class SupplierCollection {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT sc.*, s.S_FullName 
        FROM Supplier_Collection sc
        JOIN Supplier s ON sc.S_RegisterID = s.S_RegisterID
        ORDER BY sc.DateTime DESC
      `, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT sc.*, s.S_FullName 
        FROM Supplier_Collection sc
        JOIN Supplier s ON sc.S_RegisterID = s.S_RegisterID
        WHERE sc.Collection_ID = ?
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
        SELECT * FROM Supplier_Collection 
        WHERE S_RegisterID = ?
        ORDER BY DateTime DESC
      `, [supplierId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static create(collectionData) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Supplier_Collection (
          S_RegisterID, Current_Rate, DateTime, TeaBagWeight_kg, 
          Water_kg, Bag_kg, BalanceWeight_kg, TotalWeight
        ) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?)
      `;
      
      // Calculate the balance weight
      const balanceWeight = collectionData.TeaBagWeight_kg - collectionData.Water_kg - collectionData.Bag_kg;
      const totalWeight = balanceWeight; // Assuming total weight is the same as balance weight
      
      db.query(
        query,
        [
          collectionData.S_RegisterID,
          collectionData.Current_Rate,
          collectionData.TeaBagWeight_kg,
          collectionData.Water_kg,
          collectionData.Bag_kg,
          balanceWeight,
          totalWeight
        ],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }

  static update(id, collectionData) {
    return new Promise((resolve, reject) => {
      // Calculate the balance weight
      const balanceWeight = collectionData.TeaBagWeight_kg - collectionData.Water_kg - collectionData.Bag_kg;
      const totalWeight = balanceWeight; // Assuming total weight is the same as balance weight
      
      const query = `
        UPDATE Supplier_Collection SET 
          S_RegisterID = ?, 
          Current_Rate = ?, 
          TeaBagWeight_kg = ?, 
          Water_kg = ?, 
          Bag_kg = ?, 
          BalanceWeight_kg = ?, 
          TotalWeight = ?
        WHERE Collection_ID = ?
      `;
      
      db.query(
        query,
        [
          collectionData.S_RegisterID,
          collectionData.Current_Rate,
          collectionData.TeaBagWeight_kg,
          collectionData.Water_kg,
          collectionData.Bag_kg,
          balanceWeight,
          totalWeight,
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
      db.query('DELETE FROM Supplier_Collection WHERE Collection_ID = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = SupplierCollection;