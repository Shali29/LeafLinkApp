import express from 'express';
import {getAllDrivers} from '../controllers/DriverController.js';
import {getDriverById} from '../controllers/DriverController.js';
import {createDriver} from '../controllers/DriverController.js';
import { updateDriver } from '../controllers/DriverController.js';
import { deleteDriver } from '../controllers/DriverController.js';

const router = express.Router();

// GET all drivers
router.get('/:AllDrivers', getAllDrivers);

// GET driver by ID
router.get('/:DriverById', getDriverById);

// POST create new driver
router.post('/:createDriver', createDriver);

// PUT update driver
router.put('/:updateDriver', updateDriver);

// DELETE driver
router.delete('/:deleteDriver', deleteDriver);

export default router;
