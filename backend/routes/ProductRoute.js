// router.js
import express from 'express';
import db from '../config/db.js';

const router = express.Router();

// --- Model inside router ---
class ProductsModel {
  static async getAll() {
    try {
      const [rows] = await db.query('SELECT * FROM Products');
      return rows;
    } catch (error) {
      throw error;
    }
  }

  static async getById(id) {
    try {
      const [rows] = await db.query('SELECT * FROM Products WHERE ProductID = ?', [id]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
  }

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

  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM Products WHERE ProductID = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }
}

// --- Route handlers inside router ---

// GET all products
router.get('/AllProducts', async (req, res) => {
  try {
    const products = await ProductsModel.getAll();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Error fetching products', error: error.message });
  }
});

// GET product by ID
router.get('/ProductById/:id', async (req, res) => {
  try {
    const product = await ProductsModel.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Error fetching product', error: error.message });
  }
});

// POST create new product
router.post('/createProduct', async (req, res) => {
  try {
    const { ProductID, ProductName, Rate_per_Bag, Stock_bag } = req.body;
    if (!ProductID || !ProductName || !Rate_per_Bag || !Stock_bag) {
      return res.status(400).json({ message: 'All product fields are required' });
    }

    await ProductsModel.create(req.body);
    res.status(201).json({ message: 'Product created successfully' });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
});

// PUT update product
router.put('/updateProduct/:id', async (req, res) => {
  try {
    const product = await ProductsModel.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await ProductsModel.update(req.params.id, req.body);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Error updating product', error: error.message });
  }
});

// DELETE product
router.delete('/deleteProduct/:id', async (req, res) => {
  try {
    const product = await ProductsModel.getById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    await ProductsModel.delete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Error deleting product', error: error.message });
  }
});

// PUT update product stock
router.put('/updateProductStock/:id', async (req, res) => {
  try {
    const { quantity } = req.body;
    if (!quantity) {
      return res.status(400).json({ message: 'Quantity is required' });
    }

    await ProductsModel.updateStock(req.params.id, quantity);
    res.status(200).json({ message: 'Product stock updated successfully' });
  } catch (error) {
    console.error('Error updating product stock:', error);
    res.status(500).json({ message: 'Error updating product stock', error: error.message });
  }
});

export default router;
