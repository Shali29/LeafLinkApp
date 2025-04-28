// teaPacketsFertilizers.js (ESM version)
import db from '../config/db.js';

class TeaPacketsFertilizersModel {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT tpf.*, s.S_FullName, p.ProductName, p.Rate_per_Bag
        FROM TeaPackets_Fertilizers tpf
        JOIN Supplier s ON tpf.S_RegisterID = s.S_RegisterID
        JOIN Products p ON tpf.ProductID = p.ProductID
        ORDER BY tpf.Request_Date DESC
      `, (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query(`
        SELECT tpf.*, s.S_FullName, p.ProductName, p.Rate_per_Bag
        FROM TeaPackets_Fertilizers tpf
        JOIN Supplier s ON tpf.S_RegisterID = s.S_RegisterID
        JOIN Products p ON tpf.ProductID = p.ProductID
        WHERE tpf.Order_ID = ?
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
        SELECT tpf.*, p.ProductName, p.Rate_per_Bag
        FROM TeaPackets_Fertilizers tpf
        JOIN Products p ON tpf.ProductID = p.ProductID
        WHERE tpf.S_RegisterID = ?
        ORDER BY tpf.Request_Date DESC
      `, [supplierId], (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static create(orderData) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO TeaPackets_Fertilizers (
          S_RegisterID, ProductID, Qty, Request_Date, Order_Status, 
          Total_Items, Total_TeaPackets, Total_OtherItems
        ) VALUES (?, ?, ?, CURDATE(), ?, ?, ?, ?)
      `;

      orderData.Order_Status = orderData.Order_Status || 'Pending';
      orderData.Total_Items = orderData.Total_Items || orderData.Qty;
      orderData.Total_TeaPackets = orderData.Total_TeaPackets || 0;
      orderData.Total_OtherItems = orderData.Total_OtherItems || orderData.Qty;

      db.query(query, [
        orderData.S_RegisterID,
        orderData.ProductID,
        orderData.Qty,
        orderData.Order_Status,
        orderData.Total_Items,
        orderData.Total_TeaPackets,
        orderData.Total_OtherItems
      ], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  static updateStatus(id, status) {
    return new Promise((resolve, reject) => {
      db.query(
        'UPDATE TeaPackets_Fertilizers SET Order_Status = ? WHERE Order_ID = ?',
        [status, id],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }

  static update(id, orderData) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE TeaPackets_Fertilizers SET 
          S_RegisterID = ?, 
          ProductID = ?, 
          Qty = ?, 
          Order_Status = ?, 
          Total_Items = ?, 
          Total_TeaPackets = ?, 
          Total_OtherItems = ?
        WHERE Order_ID = ?
      `;

      db.query(query, [
        orderData.S_RegisterID,
        orderData.ProductID,
        orderData.Qty,
        orderData.Order_Status,
        orderData.Total_Items,
        orderData.Total_TeaPackets,
        orderData.Total_OtherItems,
        id
      ], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM TeaPackets_Fertilizers WHERE Order_ID = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

export default TeaPacketsFertilizersModel;
