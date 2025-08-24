const Cart = require('../models/cart');
const Product = require('../models/product');
const Purchase = require('../models/purchase');

/**
 * Adds product to user's cart with stock validation and cart limits
 * Decrements product quantity immediately upon adding to cart
 */
const addToCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.user.userId;

    const product = await Product.findById(productId);
    if (!product || product.quantity === 0) {
      return res.status(400).json({ message: 'Out of stock' });
    }

    const existingCartItem = await Cart.findOne({ userId, name: product.name });
    const cartCount = await Cart.countDocuments({ userId });

    if (!existingCartItem && cartCount >= 5) {
      return res.status(400).json({ message: 'Cart limit reached' });
    }

    if (existingCartItem) {
      existingCartItem.quantity += 1;
      await existingCartItem.save();
    } else {
      const cartItem = new Cart({
        userId,
        name: product.name,
        price: product.price,
        quantity: 1
      });
      await cartItem.save();
    }

    product.quantity -= 1;
    await product.save();

    res.status(201).json({ message: 'Added to cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};


const getCartItems = async (req, res) => {
  try {
    const userId = req.user.userId;
    const cartItems = await Cart.find({ userId });
    res.json(cartItems);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const deleteCartItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const userId = req.user.userId;

    const deletedItem = await Cart.findOneAndDelete({ _id: itemId, userId });

    if (!deletedItem) {
      return res.status(404).json({ message: 'Cart item not found' });
    }

    await Product.updateOne(
      { name: deletedItem.name },
      { $inc: { quantity: deletedItem.quantity } }
    );

    res.json({ message: 'Item removed from cart' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const clearCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    await Cart.deleteMany({ userId });
    res.json({ message: 'Cart cleared after order' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

const orderSuccess = async (req, res) => {
  try {
    const userId = req.user.userId;
    const lastOrder = await Purchase.findOne({ userId }).sort({ createdAt: -1 });

    if (!lastOrder) {
      return res.status(404).json({ 
        success: false,
        message: "No orders found" 
      });
    }

    res.json({
      success: true,
      order: {
        id: lastOrder._id,
        items: [{ 
          name: lastOrder.name, 
          quantity: lastOrder.quantity 
        }],
        total: lastOrder.price * lastOrder.quantity,
        address: lastOrder.address,
        date: lastOrder.createdAt
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false,
      message: "Failed to fetch order details" 
    });
  }
};

/**
 * Completes checkout process: creates order, updates sales, clears cart
 * Handles address validation and order tracking
 */
const checkoutCart = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { address, paymentMethod } = req.body;

    const finalPaymentMethod = paymentMethod ? 'COD' : 'COD';

    if (!address || typeof address !== 'object') {
      return res.status(400).json({ message: 'Address is required' });
    }

    const requiredFields = ['fullName','mobile','pincode','house','street','city','state'];
    const missingFields = requiredFields.filter(f => !address[f]);
    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing address fields: ${missingFields.join(', ')}` });
    }

    const cartItems = await Cart.find({ userId });
    if (!cartItems.length) return res.status(400).json({ message: 'Cart is empty' });

    const orderId = `ORD-${Date.now()}`;
    const orderTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    await Purchase.insertMany(cartItems.map(item => ({
      userId,
      orderId,
      name: item.name, 
      price: item.price,
      quantity: item.quantity,
      address,
      paymentMethod: finalPaymentMethod,
      status: 'pending'
    })));

    await Promise.all(cartItems.map(item =>
      Product.updateOne(
        { name: item.name },
        { $inc: { sold: item.quantity } }
      )
    ));

    await Cart.deleteMany({ userId });

    res.json({
      success: true,
      message: 'Order placed successfully',
      orderId,
      total: orderTotal,
      items: cartItems.map(item => ({
        name: item.name,
        price: item.price,
        quantity: item.quantity
      }))
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Checkout failed',
      error: error.message 
    });
  }
};

module.exports = {
  addToCart,
  getCartItems,
  deleteCartItem,
  clearCart,
  checkoutCart,
  orderSuccess
};
