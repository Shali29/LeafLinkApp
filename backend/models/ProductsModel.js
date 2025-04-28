import db from '../config/db.js'; 

class ProductsModel {
  // Fetch all products
  static async getAll() {
    try {
      const [rows] = await db.query('SELECT * FROM Products');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Fetch a product by its ID
  static async getById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM Products WHERE ProductID = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

  // Create a new product
  static async create(productData) {
    try {
      const query = `
        INSERT INTO Products (ProductID, ProductName, Rate_per_Bag, Stock_bag)
        VALUES (?, ?, ?, ?)
      `;
      const [result] = await db.query(query, [
        productData.ProductID,
        productData.ProductName,
        productData.Rate_per_Bag,
        productData.Stock_bag
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Update product details
  static async update(id, productData) {
    try {
      const query = `
        UPDATE Products SET 
          ProductName = ?, 
          Rate_per_Bag = ?, 
          Stock_bag = ?
        WHERE ProductID = ?
      `;
      const [result] = await db.query(query, [
        productData.ProductName,
        productData.Rate_per_Bag,
        productData.Stock_bag,
        id
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Update product stock (decrease stock by quantity)
  static async updateStock(id, quantity) {
    try {
      const query = `
        UPDATE Products SET 
          Stock_bag = Stock_bag - ?
        WHERE ProductID = ? AND Stock_bag >= ?
      `;
      const [result] = await db.query(query, [quantity, id, quantity]);

      if (result.affectedRows === 0) {
        throw new Error('Not enough stock available');
      }

      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete a product by its ID
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM Products WHERE ProductID = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

export default ProductsModel;
