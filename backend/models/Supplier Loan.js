const db = require('../config/database');

class SupplierLoan {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT sl.*, s.S_FullName 
        FROM Supplier_Loan sl
        JOIN Supplier s ON sl.S_RegisterID = s.S_RegisterID
        ORDER BY sl.Due_Date ASC
      `, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT sl.*, s.S_FullName 
        FROM Supplier_Loan sl
        JOIN Supplier s ON sl.S_RegisterID = s.S_RegisterID
        WHERE sl.LoanID = ?
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
        SELECT * FROM Supplier_Loan 
        WHERE S_RegisterID = ?
        ORDER BY Due_Date ASC
      `, [supplierId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static create(loanData) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Supplier_Loan (
          S_RegisterID, Loan_Amount, Duration, PurposeOfLoan, 
          Monthly_Amount, Due_Date, Status
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      // Calculate the monthly amount based on loan amount and duration
      const monthlyAmount = loanData.Duration > 0 ? 
        loanData.Loan_Amount / loanData.Duration : loanData.Loan_Amount;
      
      // Calculate due date (current date + duration in months)
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + loanData.Duration);
      
      db.query(
        query,
        [
          loanData.S_RegisterID,
          loanData.Loan_Amount,
          loanData.Duration,
          loanData.PurposeOfLoan,
          monthlyAmount,
          dueDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
          loanData.Status || 'Pending'
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
        'UPDATE Supplier_Loan SET Status = ? WHERE LoanID = ?',
        [status, id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }

  static update(id, loanData) {
    return new Promise((resolve, reject) => {
      // Calculate the monthly amount based on loan amount and duration
      const monthlyAmount = loanData.Duration > 0 ? 
        loanData.Loan_Amount / loanData.Duration : loanData.Loan_Amount;
      
      const query = `
        UPDATE Supplier_Loan SET 
          S_RegisterID = ?, 
          Loan_Amount = ?, 
          Duration = ?, 
          PurposeOfLoan = ?, 
          Monthly_Amount = ?, 
          Due_Date = ?, 
          Status = ?
        WHERE LoanID = ?
      `;
      
      // If the due date is provided, use it; otherwise, calculate it
      let dueDate;
      if (loanData.Due_Date) {
        dueDate = loanData.Due_Date;
      } else {
        dueDate = new Date();
        dueDate.setMonth(dueDate.getMonth() + loanData.Duration);
        dueDate = dueDate.toISOString().split('T')[0]; // Format as YYYY-MM-DD
      }
      
      db.query(
        query,
        [
          loanData.S_RegisterID,
          loanData.Loan_Amount,
          loanData.Duration,
          loanData.PurposeOfLoan,
          monthlyAmount,
          dueDate,
          loanData.Status,
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
      db.query('DELETE FROM Supplier_Loan WHERE LoanID = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = SupplierLoan;