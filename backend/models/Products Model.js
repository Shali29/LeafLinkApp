const db = require('../config/database');

class Product {
  static getAll() {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Products', (err, results) => {
        if (err) return reject(err);
        resolve(results);
      });
    });
  }

  static getById(id) {
    return new Promise((resolve, reject) => {
      db.query('SELECT * FROM Products WHERE ProductID = ?', [id], (err, results) => {
        if (err) return reject(err);
        if (results.length === 0) return resolve(null);
        resolve(results[0]);
      });
    });
  }

  static create(productData) {
    return new Promise((resolve, reject) => {
      const query = `
        INSERT INTO Products (ProductID, ProductName, Rate_per_Bag, Stock_bag)
        VALUES (?, ?, ?, ?)
      `;
      
      db.query(
        query,
        [
          productData.ProductID,
          productData.ProductName,
          productData.Rate_per_Bag,
          productData.Stock_bag
        ],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }

  static update(id, productData) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE Products SET 
          ProductName = ?, 
          Rate_per_Bag = ?, 
          Stock_bag = ?
        WHERE ProductID = ?
      `;
      
      db.query(
        query,
        [
          productData.ProductName,
          productData.Rate_per_Bag,
          productData.Stock_bag,
          id
        ],
        (err, result) => {
          if (err) return reject(err);
          resolve(result);
        }
      );
    });
  }

  static updateStock(id, quantity) {
    return new Promise((resolve, reject) => {
      const query = `
        UPDATE Products SET 
          Stock_bag = Stock_bag - ?
        WHERE ProductID = ? AND Stock_bag >= ?
      `;
      
      db.query(
        query,
        [quantity, id, quantity],
        (err, result) => {
          if (err) return reject(err);
          if (result.affectedRows === 0) {
            return reject(new Error('Not enough stock available'));
          }
          resolve(result);
        }
      );
    });
  }

  static delete(id) {
    return new Promise((resolve, reject) => {
      db.query('DELETE FROM Products WHERE ProductID = ?', [id], (err, result) => {
        if (err) return reject(err);
        resolve(result);
      });
    });
  }
}

module.exports = Product;