import db from '../config/db.js'; 
import bcrypt from 'bcrypt';

class SupplierModel {
  // Fetch all suppliers
  static async getAll() {
    try {
      const [results] = await db.query('SELECT S_RegisterID, S_FullName, S_Address, S_ContactNo, Email FROM Supplier');
      return results;
    } catch (error) {
      throw error;
    }
  }

  // Fetch a supplier by ID
  static async getById(id) {
    try {
      const [results] = await db.query('SELECT S_RegisterID, S_FullName, S_Address, S_ContactNo, Email, AccountNumber, BankName, Branch FROM Supplier WHERE S_RegisterID = ?', [id]);
      return results.length === 0 ? null : results[0];
    } catch (error) {
      throw error;
    }
  }

  // Create a new supplier
  static async create(supplierData) {
    try {
      // Hash password
      const hashedPassword = await bcrypt.hash(supplierData.password, 10);
      
      const query = `
        INSERT INTO Supplier (
          S_RegisterID, S_FullName, S_Address, S_ContactNo, 
          AccountNumber, BankName, Branch, Email, Username, hash_Password
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const [result] = await db.query(
        query,
        [
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
        ]
      );
      
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Update an existing supplier
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
      
      const [result] = await db.query(
        query,
        [
          supplierData.S_FullName,
          supplierData.S_Address,
          supplierData.S_ContactNo,
          supplierData.AccountNumber,
          supplierData.BankName,
          supplierData.Branch,
          supplierData.Email,
          id
        ]
      );
      
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete a supplier by ID
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM Supplier WHERE S_RegisterID = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Authenticate supplier based on username and password
  static async authenticate(username, password) {
    try {
      const [results] = await db.query('SELECT S_RegisterID, Username, hash_Password FROM Supplier WHERE Username = ?', [username]);
      if (results.length === 0) return null;
      
      const supplier = results[0];
      const match = await bcrypt.compare(password, supplier.hash_Password);
      
      if (match) {
        // Don't return the password hash
        delete supplier.hash_Password;
        return supplier;
      }
      return null;
    } catch (error) {
      throw error;
    }
  }
}

export default SupplierModel;
