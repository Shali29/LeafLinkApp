import express from 'express';
import {getAllDrivers} from '../controllers/DriverController.js';
import {getDriverById} from '../controllers/DriverController.js';
import {createDriver} from '../controllers/DriverController.js';
import { updateDriver } from '../controllers/DriverController.js';
import { deleteDriver } from '../controllers/DriverController.js';

const router = express.Router();

// GET all drivers
router.get('/', getAllDrivers);

// GET driver by ID
router.get('/:id', getDriverById);

// POST create new driver
router.post('/', createDriver);

// PUT update driver
router.put('/:id', updateDriver);

// DELETE driver
router.delete('/:id', deleteDriver);

export default router;
