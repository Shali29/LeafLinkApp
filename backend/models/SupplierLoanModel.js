import db from '../config/db.js';

class SupplierLoanModel {
  // Fetch all supplier loans ordered by due date
  static async getAll() {
    try {
      const [results] = await db.query(`
        SELECT sl.*, s.S_FullName 
        FROM Supplier_Loan sl
        JOIN Supplier s ON sl.S_RegisterID = s.S_RegisterID
        ORDER BY sl.Due_Date ASC
      `);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // Fetch a supplier loan by its ID
  static async getById(id) {
    try {
      const [results] = await db.query(`
        SELECT sl.*, s.S_FullName 
        FROM Supplier_Loan sl
        JOIN Supplier s ON sl.S_RegisterID = s.S_RegisterID
        WHERE sl.LoanID = ?
      `, [id]);
      
      return results.length === 0 ? null : results[0];
    } catch (error) {
      throw error;
    }
  }

  // Fetch all loans for a specific supplier ordered by due date
  static async getBySupplierId(supplierId) {
    try {
      const [results] = await db.query(`
        SELECT * FROM Supplier_Loan 
        WHERE S_RegisterID = ?
        ORDER BY Due_Date ASC
      `, [supplierId]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // Create a new supplier loan
  static async create(loanData) {
    try {
      // Calculate the monthly amount based on loan amount and duration
      const monthlyAmount = loanData.Duration > 0 ? 
        loanData.Loan_Amount / loanData.Duration : loanData.Loan_Amount;
      
      // Calculate due date (current date + duration in months)
      const dueDate = new Date();
      dueDate.setMonth(dueDate.getMonth() + loanData.Duration);
      
      const query = `
        INSERT INTO Supplier_Loan (
          S_RegisterID, Loan_Amount, Duration, PurposeOfLoan, 
          Monthly_Amount, Due_Date, Status
        ) VALUES (?, ?, ?, ?, ?, ?, ?)
      `;
      
      const [result] = await db.query(query, [
        loanData.S_RegisterID,
        loanData.Loan_Amount,
        loanData.Duration,
        loanData.PurposeOfLoan,
        monthlyAmount,
        dueDate.toISOString().split('T')[0], // Format as YYYY-MM-DD
        loanData.Status || 'Pending'
      ]);
      
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Update the status of a supplier loan
  static async updateStatus(id, status) {
    try {
      const [result] = await db.query(
        'UPDATE Supplier_Loan SET Status = ? WHERE LoanID = ?',
        [status, id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Update an existing supplier loan
  static async update(id, loanData) {
    try {
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
      
      const [result] = await db.query(
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
        ]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete a supplier loan by its ID
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM Supplier_Loan WHERE LoanID = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default SupplierLoanModel;
