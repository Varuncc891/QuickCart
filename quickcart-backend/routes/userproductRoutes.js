const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');

router.get('/products', authMiddleware('user'), productController.getAllProducts);

module.exports = router;