import SupplierCollection from '../models/supplier-collection.js';

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