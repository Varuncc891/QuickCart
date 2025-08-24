const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const cartController = require('../controllers/cartController');

router.get('/success', authMiddleware('user'), cartController.orderSuccess);

module.exports = router;