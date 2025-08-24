const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const analyticsController = require('../controllers/analyticsController');

router.get('/users', authMiddleware('admin'), analyticsController.getUsers);
router.get('/products/sales-summary', authMiddleware('admin'), analyticsController.getSalesSummary);
router.get('/products/top-selling', authMiddleware('admin'), analyticsController.getTopSelling);
router.get('/products/low-stock', authMiddleware('admin'), analyticsController.getLowStock);
router.get('/cart/last-purchase', authMiddleware('admin'), analyticsController.getLastPurchase);

module.exports = router;