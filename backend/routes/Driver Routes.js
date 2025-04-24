const express = require('express');
const router = express.Router();
const driverController = require('../controllers/driverController');

// GET all drivers
router.get('/', driverController.getAllDrivers);

// GET driver by ID
router.get('/:id', driverController.getDriverById);

// POST create new driver
router.post('/', driverController.createDriver);

// PUT update driver
router.put('/:id', driverController.updateDriver);

// DELETE driver
router.delete('/:id', driverController.deleteDriver);

module.exports = router;