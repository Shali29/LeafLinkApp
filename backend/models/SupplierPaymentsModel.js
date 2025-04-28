// import db connection
import db from '../config/db.js';

class SupplierPaymentsModel {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT sp.*, s.S_FullName 
        FROM Supplier_Payments sp
        JOIN Supplier s ON sp.S_RegisterID = s.S_RegisterID
        ORDER BY sp.Date DESC
      `, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT sp.*, s.S_FullName 
        FROM Supplier_Payments sp
        JOIN Supplier s ON sp.S_RegisterID = s.S_RegisterID
        WHERE sp.PaymentsID = ?
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
        SELECT * FROM Supplier_Payments 
        WHERE S_RegisterID = ?
        ORDER BY Date DESC
      `, [supplierId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static calculatePaymentData(supplierId) {
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT 
          s.S_RegisterID,
          COALESCE(SUM(sc.BalanceWeight_kg * sc.Current_Rate), 0) as GrossIncome,
          COALESCE((SELECT SUM(Loan_Amount) FROM Supplier_Loan WHERE S_RegisterID = ? AND Status != 'Successful'), 0) as LoanAmount,
          COALESCE((SELECT SUM(Advance_Amount) FROM Supplier_Advance WHERE S_RegisterID = ? AND Status != 'Transfered'), 0) as AdvanceAmount,
          COALESCE((
            SELECT SUM(tpf.Qty * p.Rate_per_Bag) 
            FROM TeaPackets_Fertilizers tpf 
            JOIN Products p ON tpf.ProductID = p.ProductID 
            WHERE tpf.S_RegisterID = ? AND tpf.Order_Status = 'Completed'
          ), 0) as ProductsAmount
        FROM Supplier s
        LEFT JOIN Supplier_Collection sc ON s.S_RegisterID = sc.S_RegisterID
        WHERE s.S_RegisterID = ?
        GROUP BY s.S_RegisterID
      `, 
      [supplierId, supplierId, supplierId, supplierId], 
      (err, results) => {
        if (err) return reject(err);
        
        if (results.length === 0) {
          db.query(`
            SELECT 
              S_RegisterID,
              0 as GrossIncome,
              COALESCE((SELECT SUM(Loan_Amount) FROM Supplier_Loan WHERE S_RegisterID = ? AND Status != 'Successful'), 0) as LoanAmount,
              COALESCE((SELECT SUM(Advance_Amount) FROM Supplier_Advance WHERE S_RegisterID = ? AND Status != 'Transfered'), 0) as AdvanceAmount,
              COALESCE((
                SELECT SUM(tpf.Qty * p.Rate_per_Bag) 
                FROM TeaPackets_Fertilizers tpf 
                JOIN Products p ON tpf.ProductID = p.ProductID 
                WHERE tpf.S_RegisterID = ? AND tpf.Order_Status = 'Completed'
              ), 0) as ProductsAmount
            FROM Supplier
            WHERE S_RegisterID = ?
          `, 
          [supplierId, supplierId, supplierId, supplierId], 
          (err, noCollectionResults) => {
            if (err) return reject(err);
            
            if (noCollectionResults.length === 0) {
              return resolve({
                S_RegisterID: supplierId,
                GrossIncome: 0,
                LoanAmount: 0,
                AdvanceAmount: 0,
                ProductsAmount: 0,
                TransportCharge: 100,
                FinalTotal: 0
              });
            }
            
            const data = noCollectionResults[0];
            data.TransportCharge = 100;
            data.FinalTotal = data.GrossIncome - data.LoanAmount - data.AdvanceAmount - data.ProductsAmount - data.TransportCharge;
            
            resolve(data);
          });
          return;
        }
        
        const data = results[0];
        data.TransportCharge = 100;
        data.FinalTotal = data.GrossIncome - data.LoanAmount - data.AdvanceAmount - data.ProductsAmount - data.TransportCharge;
        
        resolve(data);
      });
    });
  }

  static create(paymentData) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Supplier_Payments (
          S_RegisterID, Supplier_Loan_Amount, Supplier_Advance_Amount, 
          TeaPackets_Fertilizers_Amount, Transport_Charge, Final_Total_Salary, 
          Date, Status
        ) VALUES (?, ?, ?, ?, ?, ?, CURDATE(), ?)
      `;
      
      db.query(
        query,
        [
          paymentData.S_RegisterID,
          paymentData.Supplier_Loan_Amount,
          paymentData.Supplier_Advance_Amount,
          paymentData.TeaPackets_Fertilizers_Amount,
          paymentData.Transport_Charge,
          paymentData.Final_Total_Salary,
          paymentData.Status || 'Pending'
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
        'UPDATE Supplier_Payments SET Status = ? WHERE PaymentsID = ?',
        [status, id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }

  static update(id, paymentData) {
    return new Promise((resolve, reject) => {
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
      
      db.query(
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
      db.query('DELETE FROM Supplier_Payments WHERE PaymentsID = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

export default SupplierPaymentsModel;
