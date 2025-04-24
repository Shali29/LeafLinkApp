import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { testConnection } from './config/db.js';

import supplierRoutes from './routes/SupplierRoutes.js';
import driverRoutes from './routes/DriverRoutes.js';
import productsRoutes from './routes/productsRoutes.js';
import supplierCollectionRoutes from './routes/supplierCollectionRoutes.js';
import teaPacketsFertilizersRoutes from './routes/teaPacketsFertilizersRoutes.js';
import supplierLoanRoutes from './routes/supplierLoanRoutes.js';
import supplierAdvanceRoutes from './routes/supplierAdvanceRoutes.js';
import supplierPaymentsRoutes from './routes/supplierPaymentsRoutes.js';

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev'));

// Test database connection
(async () => {
  const isConnected = await testConnection();
  if (!isConnected) {
    console.error('Could not connect to the database. Exiting...');
    process.exit(1);
  }
})();

// API routes
app.use('/api/suppliers', supplierRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/collections', supplierCollectionRoutes);
app.use('/api/orders', teaPacketsFertilizersRoutes);
app.use('/api/loans', supplierLoanRoutes);
app.use('/api/advances', supplierAdvanceRoutes);
app.use('/api/payments', supplierPaymentsRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to LeafLink API',
    version: '1.0.0',
    endpoints: {
      suppliers: '/api/suppliers',
      drivers: '/api/drivers',
      products: '/api/products',
      collections: '/api/collections',
      orders: '/api/orders',
      loans: '/api/loans',
      advances: '/api/advances',
      payments: '/api/payments'
    }
  });
});

// Handle 404
app.use((req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: 'Internal Server Error',
    error: process.env.NODE_ENV === 'development' ? err.message : {}
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}`);
});

// No `module.exports` — ES Modules don't use that
