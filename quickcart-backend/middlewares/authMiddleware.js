const jwt = require('jsonwebtoken');
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) throw new Error('JWT_SECRET environment variable is required');

/**
 * Flexible authentication middleware that supports both API and web requests
 * @param {string} requiredRole - Optional role requirement ('admin' or 'user')
 * @returns {Function} Express middleware function
 * @description Handles JWT verification, role-based access, and automatic redirects
 */
const authMiddleware = (requiredRole) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader?.startsWith('Bearer ') 
      ? authHeader.split(' ')[1] 
      : req.cookies?.token;

    if (!token) {
      if (req.accepts('html')) {
        return res.redirect(requiredRole === 'admin' ? '/admin/login' : '/login');
      }
      return res.status(401).json({ 
        message: 'Authentication required',
        redirectTo: requiredRole === 'admin' ? '/admin/login' : '/login'
      });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      
      if (requiredRole && decoded.role !== requiredRole) {
        if (req.accepts('html')) {
          return res.redirect(decoded.role === 'admin' ? '/admin/dashboard' : '/');
        }
        return res.status(403).json({ 
          message: 'Access denied: Requires ' + requiredRole + ' role',
          redirectTo: decoded.role === 'admin' ? '/admin/dashboard' : '/'
        });
      }

      req.user = decoded;
      next();
    } catch (error) {
      if (req.accepts('html')) {
        return res.redirect('/login?error=invalid_token');
      }
      return res.status(401).json({ 
        message: 'Invalid or expired token',
        redirectTo: '/login?error=invalid_token'
      });
    }
  };
};

module.exports = authMiddleware;