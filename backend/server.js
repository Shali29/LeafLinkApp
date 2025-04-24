const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const { testConnection } = require('./config/db');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(morgan('dev')); // Logging middleware

// Import routes
const supplierRoutes = require('./routes/supplierRoutes');
const driverRoutes = require('./routes/driverRoutes');
const productsRoutes = require('./routes/productsRoutes');
const supplierCollectionRoutes = require('./routes/supplierCollectionRoutes');
const teaPacketsFertilizersRoutes = require('./routes/teaPacketsFertilizersRoutes');
const supplierLoanRoutes = require('./routes/supplierLoanRoutes');
const supplierAdvanceRoutes = require('./routes/supplierAdvanceRoutes');
const supplierPaymentsRoutes = require('./routes/supplierPaymentsRoutes');

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

// Error handling middleware
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

module.exports = app;