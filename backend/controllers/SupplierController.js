import Supplier from '../models/SupplierModel';
import jwt from 'jsonwebtoken';

// Helper function to generate JWT token
const generateToken = (supplier) => {
  return jwt.sign(
    { id: supplier.S_RegisterID, username: supplier.Username },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

export const getAllSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.getAll();
    res.status(200).json(suppliers);
  } catch (error) {
    console.error('Error getting suppliers:', error);
    res.status(500).json({ message: 'Error fetching suppliers', error: error.message });
  }
};

export const getSupplierById = async (req, res) => {
  try {
    const supplier = await Supplier.getById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    res.status(200).json(supplier);
  } catch (error) {
    console.error('Error getting supplier:', error);
    res.status(500).json({ message: 'Error fetching supplier', error: error.message });
  }
};

export const createSupplier = async (req, res) => {
  try {
    // Validate required fields
    const requiredFields = ['S_RegisterID', 'S_FullName', 'S_Address', 'S_ContactNo', 'AccountNumber', 'BankName', 'Branch', 'Email', 'Username', 'password'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }
    
    await Supplier.create(req.body);
    res.status(201).json({ message: 'Supplier created successfully' });
  } catch (error) {
    console.error('Error creating supplier:', error);
    res.status(500).json({ message: 'Error creating supplier', error: error.message });
  }
};

export const updateSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.getById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    
    await Supplier.update(req.params.id, req.body);
    res.status(200).json({ message: 'Supplier updated successfully' });
  } catch (error) {
    console.error('Error updating supplier:', error);
    res.status(500).json({ message: 'Error updating supplier', error: error.message });
  }
};

export const deleteSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.getById(req.params.id);
    if (!supplier) {
      return res.status(404).json({ message: 'Supplier not found' });
    }
    
    await Supplier.delete(req.params.id);
    res.status(200).json({ message: 'Supplier deleted successfully' });
  } catch (error) {
    console.error('Error deleting supplier:', error);
    res.status(500).json({ message: 'Error deleting supplier', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required' });
    }
    
    const supplier = await Supplier.authenticate(username, password);
    
    if (!supplier) {
      return res.status(401).json({ message: 'Invalid username or password' });
    }
    
    // Generate JWT token
    const token = generateToken(supplier);
    
    res.status(200).json({
      message: 'Login successful',
      supplier: {
        id: supplier.S_RegisterID,
        username: supplier.Username
      },
      token
    });
  } catch (error) {
    console.error('Error during login:', error);
    res.status(500).json({ message: 'Error during login', error: error.message });
  }
};
