import db from '../config/db.js'; 
import bcrypt from 'bcrypt';

class Supplier {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT S_RegisterID, S_FullName, S_Address, S_ContactNo, Email FROM Supplier', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT S_RegisterID, S_FullName, S_Address, S_ContactNo, Email, AccountNumber, BankName, Branch FROM Supplier WHERE S_RegisterID = ?', 
        [id], 
        (err, results) => {
          if (err) return reject(err);
          if (results.length === 0) return resolve(null);
          resolve(results[0]);
        }
      );
    });
  }

  static create(supplierData) {
    return new Promise(async (resolve, reject) => {
      try {
        // Hash password
        const hashedPassword = await bcrypt.hash(supplierData.password, 10);
        
        const query = `
          INSERT INTO Supplier (
            S_RegisterID, S_FullName, S_Address, S_ContactNo, 
            AccountNumber, BankName, Branch, Email, Username, hash_Password
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;
        
        db.query(
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
          ],
          (err, result) => {
            if (err) return reject(err);
            resolve(result);
          }
        );
      } catch (error) {
        reject(error);
      }
    });
  }

  static update(id, supplierData) {
    return new Promise((resolve, reject) => {
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
      
      db.query(
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
      db.query('DELETE FROM Supplier WHERE S_RegisterID = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  static authenticate(username, password) {
    return new Promise((resolve, reject) => {
      db.query('SELECT S_RegisterID, Username, hash_Password FROM Supplier WHERE Username = ?', 
        [username], 
        async (err, results) => {
          if (err) return reject(err);
          if (results.length === 0) return resolve(null);
          
          const supplier = results[0];
          
          try {
            const match = await bcrypt.compare(password, supplier.hash_Password);
            if (match) {
              // Don't return the password hash
              delete supplier.hash_Password;
              resolve(supplier);
            } else {
              resolve(null);
            }
          } catch (error) {
            reject(error);
          }
        }
      );
    });
  }
}

export default Supplier;
