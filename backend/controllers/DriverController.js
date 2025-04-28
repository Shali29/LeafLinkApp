import Driver from "../models/DriverModel.js";
export const getAllDrivers = async (req, res) => {
  try {
    const drivers = await Driver.getAll();
    res.status(200).json(drivers);
  } catch (error) {
    console.error('Error getting drivers:', error);
    res.status(500).json({ message: 'Error fetching drivers', error: error.message });
  }
};

export const getDriverById = async (req, res) => {
  try {
    const driver = await Driver.getById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }
    res.status(200).json(driver);
  } catch (error) {
    console.error('Error getting driver:', error);
    res.status(500).json({ message: 'Error fetching driver', error: error.message });
  }
};

export const createDriver = async (req, res) => {
  try {
    const requiredFields = ['D_RegisterID', 'D_FullName', 'D_ContactNumber', 'Email', 'VehicalNumber', 'Route'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    await Driver.create(req.body);
    res.status(201).json({ message: 'Driver created successfully' });
  } catch (error) {
    console.error('Error creating driver:', error);
    res.status(500).json({ message: 'Error creating driver', error: error.message });
  }
};

export const updateDriver = async (req, res) => {
  try {
    const driver = await Driver.getById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    await Driver.update(req.params.id, req.body);
    res.status(200).json({ message: 'Driver updated successfully' });
  } catch (error) {
    console.error('Error updating driver:', error);
    res.status(500).json({ message: 'Error updating driver', error: error.message });
  }
};

export const deleteDriver = async (req, res) => {
  try {
    const driver = await Driver.getById(req.params.id);
    if (!driver) {
      return res.status(404).json({ message: 'Driver not found' });
    }

    await Driver.delete(req.params.id);
    res.status(200).json({ message: 'Driver deleted successfully' });
  } catch (error) {
    console.error('Error deleting driver:', error);
    res.status(500).json({ message: 'Error deleting driver', error: error.message });
  }
};
