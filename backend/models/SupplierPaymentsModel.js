import db from '../config/db.js';

class SupplierPaymentsModel {
  // Get all supplier payments
  static async getAll() {
    try {
      const [results] = await db.query(`
        SELECT sp.*, s.S_FullName 
        FROM Supplier_Payments sp
        JOIN Supplier s ON sp.S_RegisterID = s.S_RegisterID
        ORDER BY sp.Date DESC
      `);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // Get a supplier payment by ID
  static async getById(id) {
    try {
      const [results] = await db.query(`
        SELECT sp.*, s.S_FullName 
        FROM Supplier_Payments sp
        JOIN Supplier s ON sp.S_RegisterID = s.S_RegisterID
        WHERE sp.PaymentsID = ?
      `, [id]);
      return results.length === 0 ? null : results[0];
    } catch (error) {
      throw error;
    }
  }

  // Get supplier payments by supplier ID
  static async getBySupplierId(supplierId) {
    try {
      const [results] = await db.query(`
        SELECT * FROM Supplier_Payments 
        WHERE S_RegisterID = ?
        ORDER BY Date DESC
      `, [supplierId]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // Calculate payment data for a supplier
  static async calculatePaymentData(supplierId) {
    try {
      const [results] = await db.query(`
        SELECT 
          s.S_RegisterID,
          COALESCE(SUM(sc.BalanceWeight_kg * sc.Current_Rate), 0) as GrossIncome,
          COALESCE((SELECT SUM(Loan_Amount) FROM Supplier_Loan WHERE S_RegisterID = ? AND Status != 'Successful'), 0) as LoanAmount,
          COALESCE((SELECT SUM(Advance_Amount) FROM Supplier_Advance WHERE S_RegisterID = ? AND Status != 'Transfered'), 0) as AdvanceAmount,
          COALESCE((SELECT SUM(tpf.Qty * p.Rate_per_Bag) 
            FROM TeaPackets_Fertilizers tpf 
            JOIN Products p ON tpf.ProductID = p.ProductID 
            WHERE tpf.S_RegisterID = ? AND tpf.Order_Status = 'Completed'), 0) as ProductsAmount
        FROM Supplier s
        LEFT JOIN Supplier_Collection sc ON s.S_RegisterID = sc.S_RegisterID
        WHERE s.S_RegisterID = ?
        GROUP BY s.S_RegisterID
      `, [supplierId, supplierId, supplierId, supplierId]);

      if (results.length === 0) {
        const [noCollectionResults] = await db.query(`
          SELECT 
            S_RegisterID,
            0 as GrossIncome,
            COALESCE((SELECT SUM(Loan_Amount) FROM Supplier_Loan WHERE S_RegisterID = ? AND Status != 'Successful'), 0) as LoanAmount,
            COALESCE((SELECT SUM(Advance_Amount) FROM Supplier_Advance WHERE S_RegisterID = ? AND Status != 'Transfered'), 0) as AdvanceAmount,
            COALESCE((SELECT SUM(tpf.Qty * p.Rate_per_Bag) 
              FROM TeaPackets_Fertilizers tpf 
              JOIN Products p ON tpf.ProductID = p.ProductID 
              WHERE tpf.S_RegisterID = ? AND tpf.Order_Status = 'Completed'), 0) as ProductsAmount
          FROM Supplier
          WHERE S_RegisterID = ?
        `, [supplierId, supplierId, supplierId, supplierId]);

        if (noCollectionResults.length === 0) {
          return {
            S_RegisterID: supplierId,
            GrossIncome: 0,
            LoanAmount: 0,
            AdvanceAmount: 0,
            ProductsAmount: 0,
            TransportCharge: 100,
            FinalTotal: 0
          };
        }

        const data = noCollectionResults[0];
        data.TransportCharge = 100;
        data.FinalTotal = data.GrossIncome - data.LoanAmount - data.AdvanceAmount - data.ProductsAmount - data.TransportCharge;
        return data;
      }

      const data = results[0];
      data.TransportCharge = 100;
      data.FinalTotal = data.GrossIncome - data.LoanAmount - data.AdvanceAmount - data.ProductsAmount - data.TransportCharge;
      return data;
    } catch (error) {
      throw error;
    }
  }

  // Create a new payment
  static async create(paymentData) {
    try {
      const query = `
        INSERT INTO Supplier_Payments (
          S_RegisterID, Supplier_Loan_Amount, Supplier_Advance_Amount, 
          TeaPackets_Fertilizers_Amount, Transport_Charge, Final_Total_Salary, 
          Date, Status
        ) VALUES (?, ?, ?, ?, ?, ?, CURDATE(), ?)
      `;
      
      const [result] = await db.query(
        query,
        [
          paymentData.S_RegisterID,
          paymentData.Supplier_Loan_Amount,
          paymentData.Supplier_Advance_Amount,
          paymentData.TeaPackets_Fertilizers_Amount,
          paymentData.Transport_Charge,
          paymentData.Final_Total_Salary,
          paymentData.Status || 'Pending'
        ]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Update the status of a payment
  static async updateStatus(id, status) {
    try {
      const [result] = await db.query(
        'UPDATE Supplier_Payments SET Status = ? WHERE PaymentsID = ?',
        [status, id]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Update payment data
  static async update(id, paymentData) {
    try {
      const query = `
        UPDATE Supplier_Payments SET 
          S_RegisterID = ?, 
          Supplier_Loan_Amount = ?, 
          Supplier_Advance_Amount = ?, 
          TeaPackets_Fertilizers_Amount = ?, 
          Transport_Charge = ?, 
          Final_Total_Salary = ?, 
          Date = ?, 
          Status = ? 
        WHERE PaymentsID = ?
      `;

      const [result] = await db.query(
        query,
        [
          paymentData.S_RegisterID,
          paymentData.Supplier_Loan_Amount,
          paymentData.Supplier_Advance_Amount,
          paymentData.TeaPackets_Fertilizers_Amount,
          paymentData.Transport_Charge,
          paymentData.Final_Total_Salary,
          paymentData.Date || new Date().toISOString().split('T')[0],
          paymentData.Status,
          id
        ]
      );
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete payment by ID
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM Supplier_Payments WHERE PaymentsID = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default SupplierPaymentsModel;
