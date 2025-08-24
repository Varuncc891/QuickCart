const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../models/admin');

const JWT_SECRET = process.env.JWT_SECRET;

const ensureAdminExists = async () => {
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
  }
};

/**
 * Authenticates admin users and issues JWT tokens
 * Uses bcrypt for password comparison and JWT for session management
 */
const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  try {
    const admin = await Admin.findOne({ username });
    if (!admin) return res.status(404).json({ message: 'Admin not found' });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign(
      { adminId: admin._id, role: 'admin' },  
      JWT_SECRET,
      { expiresIn: '15m' }
    );
    res.json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = {
  ensureAdminExists,
  adminLogin
};