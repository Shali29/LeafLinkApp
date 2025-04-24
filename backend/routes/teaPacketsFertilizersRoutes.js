import express from 'express';
import teaPacketsFertilizersController from '../controllers/teaPacketsFertilizersController.js';

const router = express.Router();

// GET all orders
router.get('/', teaPacketsFertilizersController.getAllOrders);

// GET orders by supplier ID
router.get('/supplier/:supplierId', teaPacketsFertilizersController.getOrdersBySupplier);

// GET order by ID
router.get('/:id', teaPacketsFertilizersController.getOrderById);

// POST create new order
router.post('/', teaPacketsFertilizersController.createOrder);

// PUT update order
router.put('/:id', teaPacketsFertilizersController.updateOrder);

// DELETE order
router.delete('/:id', teaPacketsFertilizersController.deleteOrder);

// PUT update order status
router.put('/:id/status', teaPacketsFertilizersController.updateOrderStatus);

// GET order statistics
router.get('/stats/summary', teaPacketsFertilizersController.getOrderStatistics);

export default router;
