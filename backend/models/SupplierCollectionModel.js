import db from '../config/db.js'; 

class SupplierCollectionModel {
  // Fetch all supplier collections with supplier name
  static async getAll() {
    try {
      const [results] = await db.query(`
        SELECT sc.*, s.S_FullName 
        FROM Supplier_Collection sc
        JOIN Supplier s ON sc.S_RegisterID = s.S_RegisterID
        ORDER BY sc.DateTime DESC
      `);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // Fetch a supplier collection by its ID
  static async getById(id) {
    try {
      const [results] = await db.query(`
        SELECT sc.*, s.S_FullName 
        FROM Supplier_Collection sc
        JOIN Supplier s ON sc.S_RegisterID = s.S_RegisterID
        WHERE sc.Collection_ID = ?
      `, [id]);
      
      return results.length === 0 ? null : results[0];
    } catch (error) {
      throw error;
    }
  }

  // Fetch all collections for a specific supplier
  static async getBySupplierId(supplierId) {
    try {
      const [results] = await db.query(`
        SELECT * FROM Supplier_Collection 
        WHERE S_RegisterID = ?
        ORDER BY DateTime DESC
      `, [supplierId]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // Create a new supplier collection
  static async create(collectionData) {
    try {
      // Calculate the balance weight
      const balanceWeight = collectionData.TeaBagWeight_kg - collectionData.Water_kg - collectionData.Bag_kg;
      const totalWeight = balanceWeight; // Assuming total weight is the same as balance weight

      const query = `
        INSERT INTO Supplier_Collection (
          S_RegisterID, Current_Rate, DateTime, TeaBagWeight_kg, 
          Water_kg, Bag_kg, BalanceWeight_kg, TotalWeight
        ) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?)
      `;
      
      const [result] = await db.query(query, [
        collectionData.S_RegisterID,
        collectionData.Current_Rate,
        collectionData.TeaBagWeight_kg,
        collectionData.Water_kg,
        collectionData.Bag_kg,
        balanceWeight,
        totalWeight
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Update an existing supplier collection
  static async update(id, collectionData) {
    try {
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
      
      const [result] = await db.query(query, [
        collectionData.S_RegisterID,
        collectionData.Current_Rate,
        collectionData.TeaBagWeight_kg,
        collectionData.Water_kg,
        collectionData.Bag_kg,
        balanceWeight,
        totalWeight,
        id
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete a supplier collection by its ID
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM Supplier_Collection WHERE Collection_ID = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default SupplierCollectionModel;
