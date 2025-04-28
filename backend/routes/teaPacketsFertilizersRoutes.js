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
router.get('/:Allorders', getAllOrders);

// GET orders by supplier ID
router.get('/:OrdersBySupplier', getOrdersBySupplier);

// GET order by ID
router.get('/:OrderById', getOrderById);

// POST create new order
router.post('/:CreateOrder', createOrder);

// PUT update order
router.put('/:updateOrder', updateOrder);

// DELETE order
router.delete('/:deleteOrder', deleteOrder);

// PUT update order status
router.put('/:updateOrderStatus', updateOrderStatus);

// GET order statistics
router.get('/:OrderStatistics', getOrderStatistics);

export default router;
