const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const productController = require('../controllers/productController');

router.get('/', productController.getAllProducts);

router.post('/', authMiddleware('admin'), productController.addProduct);
router.delete('/:id', authMiddleware('admin'), productController.deleteProduct);
router.patch('/:id/decrease', authMiddleware('admin'), productController.decreaseQuantity);
router.patch('/:id/increase', authMiddleware('admin'), productController.increaseQuantity);

module.exports = router;