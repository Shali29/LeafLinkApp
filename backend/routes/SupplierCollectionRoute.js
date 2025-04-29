import SupplierCollectionModel from '../models/SupplierCollectionModel.js';

// Get all collections
export const getAllCollections = async (req, res) => {
  try {
    const collections = await SupplierCollectionModel.getAll();
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch collections', error: error.message });
  }
};

// Get collections by supplier ID
export const getCollectionsBySupplier = async (req, res) => {
  try {
    const supplierId = req.params.CollectionsBySupplier;
    const collections = await SupplierCollectionModel.getBySupplierId(supplierId);
    res.status(200).json(collections);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch collections for supplier', error: error.message });
  }
};

// Get collection by ID
export const getCollectionById = async (req, res) => {
  try {
    const collectionId = req.params.CollectionById;
    const collection = await SupplierCollectionModel.getById(collectionId);
    if (!collection) {
      return res.status(404).json({ message: 'Collection not found' });
    }
    res.status(200).json(collection);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch collection', error: error.message });
  }
};

// Create new collection
export const createCollection = async (req, res) => {
  try {
    const result = await SupplierCollectionModel.create(req.body);
    res.status(201).json({ message: 'Collection created successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create collection', error: error.message });
  }
};

// Update collection
export const updateCollection = async (req, res) => {
  try {
    const collectionId = req.params.updateCollection;
    const result = await SupplierCollectionModel.update(collectionId, req.body);
    res.status(200).json({ message: 'Collection updated successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update collection', error: error.message });
  }
};

// Delete collection
export const deleteCollection = async (req, res) => {
  try {
    const collectionId = req.params.deleteCollection;
    const result = await SupplierCollectionModel.delete(collectionId);
    res.status(200).json({ message: 'Collection deleted successfully', result });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete collection', error: error.message });
  }
};

// Get collection statistics (example implementation)
export const getCollectionStatistics = async (req, res) => {
  try {
    // Example: total number of collections
    const collections = await SupplierCollectionModel.getAll();
    const totalCollections = collections.length;
    res.status(200).json({ totalCollections });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch collection statistics', error: error.message });
  }
};
