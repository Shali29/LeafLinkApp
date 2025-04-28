import express from 'express';
import {getAllOrders} from '../controllers/teaPacketsFertilizersController.js';
import {getOrdersBySupplier} from '../controllers/teaPacketsFertilizersController.js';
import {getOrderById} from '../controllers/teaPacketsFertilizersController.js';
import {createOrder} from '../controllers/teaPacketsFertilizersController.js';
import {updateOrder} from '../controllers/teaPacketsFertilizersController.js';
import {deleteOrder} from '../controllers/teaPacketsFertilizersController.js';
import {updateOrderStatus} from '../controllers/teaPacketsFertilizersController.js';
import {getOrderStatistics} from '../controllers/teaPacketsFertilizersController.js';

const router = express.Router();

// GET all orders
router.get('/', getAllOrders);

// GET orders by supplier ID
router.get('/supplier/:supplierId', getOrdersBySupplier);

// GET order by ID
router.get('/:id', getOrderById);

// POST create new order
router.post('/', createOrder);

// PUT update order
router.put('/:id', updateOrder);

// DELETE order
router.delete('/:id', deleteOrder);

// PUT update order status
router.put('/:id/status', updateOrderStatus);

// GET order statistics
router.get('/stats/summary', getOrderStatistics);

export default router;
