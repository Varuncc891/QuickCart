const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable is required');

/**
 * Middleware to verify JWT token from Authorization header
 * Protects routes by validating user authentication
 */
const verifyToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(403).json({ message: 'Token missing' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(403).json({ message: 'Token missing' });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

/**
 * Middleware to verify user has admin privileges
 * Must be used after verifyToken middleware
 */
const verifyAdmin = async (req, res, next) => {
  if (!req.user?.adminId) return res.status(403).json({ message: 'Admin access required' });

  try {
    const admin = await Admin.findById(req.user.adminId);
    if (!admin) return res.status(403).json({ message: 'Admin access required' });
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid admin token' });
  }
};

const ensureAdminExists = async () => {
  try {
    const adminEmail = process.env.DEFAULT_ADMIN_EMAIL;
    const adminPassword = process.env.DEFAULT_ADMIN_PASSWORD;
    
    if (!adminEmail || !adminPassword) {
      console.log('⚠️  No default admin credentials provided');
      return;
    }

    const existing = await Admin.findOne({ username: adminEmail });
    if (!existing) {
      const hashedPassword = await bcrypt.hash(adminPassword, 12);
      await Admin.create({ 
        username: adminEmail, 
        password: hashedPassword 
      });
      console.log('Default admin created');
    }
  } catch (err) {
    console.error('Error ensuring default admin:', err.message);
  }
};

module.exports = {
  verifyToken,
  verifyAdmin,
  ensureAdminExists,
  JWT_SECRET
};
