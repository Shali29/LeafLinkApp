import TeaPacketsFertilizers from '../models/TeaPackets&FertilizersModel.js';
import Product from '../models/products.js';

export const getAllOrders = async (req, res) => {
  try {
    const orders = await TeaPacketsFertilizers.getAll();
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error getting orders:', error);
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await TeaPacketsFertilizers.getById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    console.error('Error getting order:', error);
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
};

export const getOrdersBySupplier = async (req, res) => {
  try {
    const orders = await TeaPacketsFertilizers.getBySupplierId(req.params.supplierId);
    res.status(200).json(orders);
  } catch (error) {
    console.error('Error getting supplier orders:', error);
    res.status(500).json({ message: 'Error fetching supplier orders', error: error.message });
  }
};

export const createOrder = async (req, res) => {
  try {
    const requiredFields = ['S_RegisterID', 'ProductID', 'Qty'];
    for (const field of requiredFields) {
      if (!req.body[field]) {
        return res.status(400).json({ message: `${field} is required` });
      }
    }

    const product = await Product.getById(req.body.ProductID);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    if (product.Stock_bag < req.body.Qty) {
      return res.status(400).json({ message: 'Not enough stock available' });
    }

    await TeaPacketsFertilizers.create(req.body);

    if (req.body.Order_Status === 'Completed') {
      await Product.updateStock(req.body.ProductID, req.body.Qty);
    }

    res.status(201).json({ message: 'Order created successfully' });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: 'Status is required' });
    }

    const order = await TeaPacketsFertilizers.getById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    if (status === 'Completed' && order.Order_Status !== 'Completed') {
      const product = await Product.getById(order.ProductID);
      if (product.Stock_bag < order.Qty) {
        return res.status(400).json({ message: 'Not enough stock available to complete this order' });
      }

      await Product.updateStock(order.ProductID, order.Qty);
    }

    await TeaPacketsFertilizers.updateStatus(req.params.id, status);
    res.status(200).json({ message: 'Order status updated successfully' });
  } catch (error) {
    console.error('Error updating order status:', error);
    res.status(500).json({ message: 'Error updating order status', error: error.message });
  }
};

export const updateOrder = async (req, res) => {
  try {
    const order = await TeaPacketsFertilizers.getById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await TeaPacketsFertilizers.update(req.params.id, req.body);
    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
};

export const deleteOrder = async (req, res) => {
  try {
    const order = await TeaPacketsFertilizers.getById(req.params.id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    await TeaPacketsFertilizers.delete(req.params.id);
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Error deleting order', error: error.message });
  }
};
