const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const cookieParser = require('cookie-parser');

// Load environment variables first
dotenv.config();

const app = express();

// Middleware setup (harus di atas sebelum routes)
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Swagger API Documentation
const apiDocumentation = require('./apiDocs.json');
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(apiDocumentation));

const PORT = process.env.PORT || 5000; // default port jika tidak ada di .env

// Test server route
app.get('/', (req, res) => {
  res.send('Halo server jalan');
});

// Handle routes dengan detailed error handling
console.log('Loading routes...');

try {
  console.log('Loading user routes...');
  const userRoutes = require('./routes/user');
  app.use('/users', userRoutes);
  console.log('✅ User routes loaded successfully');
} catch (error) {
  console.error('❌ FAILED to load user routes:');
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
  console.error('Full error:', error);
  process.exit(1);
}

try {
  console.log('Loading category routes...');
  const categoryRoutes = require('./routes/category');
  app.use('/category', categoryRoutes);
  console.log('✅ Category routes loaded successfully');
} catch (error) {
  console.error('❌ FAILED to load category routes:');
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
  console.error('Full error:', error);
  process.exit(1);
}

// Load predict routes BEFORE product routes to avoid conflicts
try {
  console.log('Loading predict routes...');
  const predictRoutes = require('./routes/predict');
  app.use('/predict', predictRoutes);
  console.log('✅ Predict routes loaded successfully');
} catch (error) {
  console.error('❌ FAILED to load predict routes:');
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
  console.error('Full error:', error);
  // Don't exit on predict route failure - continue without it
  console.warn('⚠️ Continuing without predict routes...');
}

try {
  console.log('Loading product routes...');
  const productRoutes = require('./routes/product');
  app.use('/product', productRoutes);
  console.log('✅ Product routes loaded successfully');
} catch (error) {
  console.error('❌ FAILED to load product routes:');
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
  console.error('Full error:', error);
  process.exit(1);
}

try {
  console.log('Loading wishlist routes...');
  const wishlistRoutes = require('./routes/wishlist');
  app.use('/wishlist', wishlistRoutes);
  console.log('✅ Wishlist routes loaded successfully');
} catch (error) {
  console.error('❌ FAILED to load wishlist routes:');
  console.error('Error message:', error.message);
  console.error('Error stack:', error.stack);
  console.error('Full error:', error);
  process.exit(1);
}

console.log('✅ All routes loaded successfully');

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server started at http://localhost:${PORT}`);
  console.log(`API Documentation available at http://localhost:${PORT}/api-docs`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error('❌ UNHANDLED PROMISE REJECTION:');
  console.error('Error message:', err.message);
  console.error('Error stack:', err.stack);
  console.error('Promise:', promise);
  console.error('Full error:', err);
  process.exit(1);
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('❌ UNCAUGHT EXCEPTION:');
  console.error('Error message:', err.message);
  console.error('Error stack:', err.stack);
  console.error('Full error:', err);
  process.exit(1);
});