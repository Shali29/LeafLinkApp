import db from '../config/db.js';

// Model class and methods
class SupplierCollection {
  // Fetch all supplier collections with supplier name
  static async getAll() {
    try {
      const [results] = await db.query(`
        SELECT sc.*, s.S_FullName 
        FROM Supplier_Collection sc
        JOIN Supplier s ON sc.S_RegisterID = s.S_RegisterID
        ORDER BY sc.DateTime DESC
      `);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // Fetch a supplier collection by its ID
  static async getById(id) {
    try {
      const [results] = await db.query(`
        SELECT sc.*, s.S_FullName 
        FROM Supplier_Collection sc
        JOIN Supplier s ON sc.S_RegisterID = s.S_RegisterID
        WHERE sc.Collection_ID = ?
      `, [id]);
      
      return results.length === 0 ? null : results[0];
    } catch (error) {
      throw error;
    }
  }

  // Fetch all collections for a specific supplier
  static async getBySupplierId(supplierId) {
    try {
      const [results] = await db.query(`
        SELECT * FROM Supplier_Collection 
        WHERE S_RegisterID = ?
        ORDER BY DateTime DESC
      `, [supplierId]);
      return results;
    } catch (error) {
      throw error;
    }
  }

  // Create a new supplier collection
  static async create(collectionData) {
    try {
      // Calculate the balance weight
      const balanceWeight = collectionData.TeaBagWeight_kg - collectionData.Water_kg - collectionData.Bag_kg;
      const totalWeight = balanceWeight; // Assuming total weight is the same as balance weight

      const query = `
        INSERT INTO Supplier_Collection (
          S_RegisterID, Current_Rate, DateTime, TeaBagWeight_kg, 
          Water_kg, Bag_kg, BalanceWeight_kg, TotalWeight
        ) VALUES (?, ?, NOW(), ?, ?, ?, ?, ?)
      `;
      
      const [result] = await db.query(query, [
        collectionData.S_RegisterID,
        collectionData.Current_Rate,
        collectionData.TeaBagWeight_kg,
        collectionData.Water_kg,
        collectionData.Bag_kg,
        balanceWeight,
        totalWeight
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Update an existing supplier collection
  static async update(id, collectionData) {
    try {
      // Calculate the balance weight
      const balanceWeight = collectionData.TeaBagWeight_kg - collectionData.Water_kg - collectionData.Bag_kg;
      const totalWeight = balanceWeight; // Assuming total weight is the same as balance weight

      const query = `
        UPDATE Supplier_Collection SET 
          S_RegisterID = ?, 
          Current_Rate = ?, 
          TeaBagWeight_kg = ?, 
          Water_kg = ?, 
          Bag_kg = ?, 
          BalanceWeight_kg = ?, 
          TotalWeight = ?
        WHERE Collection_ID = ?
      `;
      
      const [result] = await db.query(query, [
        collectionData.S_RegisterID,
        collectionData.Current_Rate,
        collectionData.TeaBagWeight_kg,
        collectionData.Water_kg,
        collectionData.Bag_kg,
        balanceWeight,
        totalWeight,
        id
      ]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Delete a supplier collection by its ID
  static async delete(id) {
    try {
      const [result] = await db.query('DELETE FROM Supplier_Collection WHERE Collection_ID = ?', [id]);
      return result;
    } catch (error) {
      throw error;
    }
  }

  // Get statistics (placeholder implementation for the function referenced in controller)
  static async getStatistics() {
    try {
      // Get total collections count
      const [countResult] = await db.query('SELECT COUNT(*) as totalCollections FROM Supplier_Collection');
      
      // Get total tea weight collected
      const [weightResult] = await db.query('SELECT SUM(BalanceWeight_kg) as totalTeaWeight FROM Supplier_Collection');
      
      // Get average rate
      const [rateResult] = await db.query('SELECT AVG(Current_Rate) as averageRate FROM Supplier_Collection');
      
      // Get collections by date (last 30 days)
      const [dailyCollections] = await db.query(`
        SELECT DATE(DateTime) as date, SUM(BalanceWeight_kg) as totalWeight
        FROM Supplier_Collection
        WHERE DateTime >= DATE_SUB(CURDATE(), INTERVAL 30 DAY)
        GROUP BY DATE(DateTime)
        ORDER BY date ASC
      `);

      return {
        totalCollections: countResult[0].totalCollections,
        totalTeaWeight: weightResult[0].totalTeaWeight,
        averageRate: rateResult[0].averageRate,
        dailyCollections: dailyCollections
      };
    } catch (error) {
      throw error;
    }
  }
}

// Controller functions
export const getAllCollections = async (req, res) => {
  try {
    const collections = await SupplierCollection.getAll();
    res.status(200).json(collections);
  } catch (error) {
    console.error('Error getting collections:', error);
    res.status(500).json({ message: 'Error fetching collections', error: error.message });
  }
};

export const getCollectionById = async (req, res) => {
  try {
    const collection = await SupplierCollection.getById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.status(200).json(collection);
  } catch (error) {
    console.error('Error getting collection:', error);
    res.status(500).json({ message: 'Error fetching collection', error: error.message });
  }
};

export const getCollectionsBySupplier = async (req, res) => {
  try {
    const collections = await SupplierCollection.getBySupplierId(req.params.supplierId);
    res.status(200).json(collections);
  } catch (error) {
    console.error('Error getting supplier collections:', error);
    res.status(500).json({ message: 'Error fetching supplier collections', error: error.message });
  }
};

export const createCollection = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['S_RegisterID', 'Current_Rate', 'TeaBagWeight_kg', 'Water_kg', 'Bag_kg'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }
    
    await SupplierCollection.create(req.body);
    res.status(201).json({ message: 'Collection created successfully' });
  } catch (error) {
    console.error('Error creating collection:', error);
    res.status(500).json({ message: 'Error creating collection', error: error.message });
  }
};

export const updateCollection = async (req, res) => {
  try {
    const collection = await SupplierCollection.getById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    
    await SupplierCollection.update(req.params.id, req.body);
    res.status(200).json({ message: 'Collection updated successfully' });
  } catch (error) {
    console.error('Error updating collection:', error);
    res.status(500).json({ message: 'Error updating collection', error: error.message });
  }
};

export const deleteCollection = async (req, res) => {
  try {
    const collection = await SupplierCollection.getById(req.params.id);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    
    await SupplierCollection.delete(req.params.id);
    res.status(200).json({ message: 'Collection deleted successfully' });
  } catch (error) {
    console.error('Error deleting collection:', error);
    res.status(500).json({ message: 'Error deleting collection', error: error.message });
  }
};

export const getCollectionStatistics = async (req, res) => {
  try {
    const statistics = await SupplierCollection.getStatistics();
    res.status(200).json(statistics);
  } catch (error) {
    console.error('Error getting collection statistics:', error);
    res.status(500).json({ message: 'Error fetching collection statistics', error: error.message });
  }
};