require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

// Route imports
const adminRoutes = require('./routes/adminRoutes');
const userRoutes = require('./routes/userRoutes'); 
const userproductRoutes = require('./routes/userproductRoutes');
const usercartRoutes = require('./routes/usercartRoutes');
const usersuccessRoutes = require('./routes/usersuccessRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const productRoutes = require('./routes/productRoutes');

// Controllers
const { errorHandler } = require('./controllers/errorController');
const { ensureAdminExists } = require('./controllers/adminController');

const app = express();

// Database connection
connectDB();

// Create default admin
(async () => {
  try {
    await ensureAdminExists();
    console.log('✅ Admin initialization completed');
  } catch (error) {
    console.error('❌ Admin initialization failed:', error.message);
  }
})();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Public routes
app.use('/api/users', userRoutes); 

// Protected user routes
app.use('/api/products', userproductRoutes); 
app.use('/cart', usercartRoutes);       
app.use('/api/orders', usersuccessRoutes);  


// Admin routes
app.use('/api/admin', adminRoutes);
app.use('/products', adminRoutes);         
app.use('/api', analyticsRoutes); 
app.use('/', analyticsRoutes);    
app.use('/products', productRoutes);
app.use('/admin/products', productRoutes);

// Error handler 
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));