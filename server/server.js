const express = require('express');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');
const { connectDB } = require('./config/db');
const seedDB = require('./config/seed');

// Initialize dotenv configuration
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Initialize middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' })); // Support base64 image uploads

// Database Connection & Seeding
connectDB().then(() => {
  // Execute seeding script automatically
  seedDB();
});

// Import API Route Modules
const authRoutes = require('./routes/auth');
const serviceRoutes = require('./routes/services');
const orderRoutes = require('./routes/orders');
const reviewRoutes = require('./routes/reviews');
const paymentRoutes = require('./routes/payments');

// Bind API Endpoints
app.use('/api/auth', authRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/payments', paymentRoutes);

// Database Health Check Route
app.get('/api/health', (req, res) => {
  const { getDBStatus } = require('./config/db');
  res.json({
    status: 'online',
    timestamp: new Date().toISOString(),
    database: getDBStatus()
  });
});

// Serve client in production (fallback placeholder)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../client', 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('flemlabs API is running successfully...');
  });
}

// Start API Listener
app.listen(PORT, () => {
  console.log(`flemlabs Server listening on port ${PORT}`);
});
