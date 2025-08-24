const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');

router.post('/', authMiddleware('user'), cartController.addToCart);
router.get('/', authMiddleware('user'), cartController.getCartItems);
router.delete('/:id', authMiddleware('user'), cartController.deleteCartItem);
router.delete('/clear', authMiddleware('admin'), cartController.clearCart);
router.post('/checkout', authMiddleware('user'), cartController.checkoutCart);

module.exports = router;
