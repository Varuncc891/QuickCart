const Product = require('../models/product');
const Purchase = require('../models/purchase');

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error fetching products' });
  }
};

const addProduct = async (req, res) => {
  try {
    const { name, price, quantity } = req.body;
    if (!name || price == null || quantity == null) {
      return res.status(400).json({ message: 'Name, price, and quantity are required' });
    }

    const product = new Product({ name, price, quantity, seller: req.user.userId || 'unknown' });
    await product.save();
    res.status(201).json({ message: 'Product added successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error adding product' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const hasOrders = await Purchase.exists({ productId: id });
    if (hasOrders) {
      return res.status(400).json({ message: 'Cannot delete product with existing orders' });
    }

    await Product.findByIdAndDelete(id);
    res.json({ message: 'Product deleted successfully', deletedId: id });
  } catch (err) {
    res.status(500).json({ message: 'Server error deleting product' });
  }
};

const decreaseQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.quantity <= 0) {
      return res.status(400).json({ message: 'Quantity already zero' });
    }

    const updatedProduct = await Product.findByIdAndUpdate(id, { $inc: { quantity: -1 } }, { new: true });
    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Server error updating quantity' });
  }
};

const increaseQuantity = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProduct = await Product.findByIdAndUpdate(id, { $inc: { quantity: 1 } }, { new: true });
    if (!updatedProduct) return res.status(404).json({ message: 'Product not found' });

    res.json(updatedProduct);
  } catch (err) {
    res.status(500).json({ message: 'Server error updating quantity' });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  deleteProduct,
  decreaseQuantity,
  increaseQuantity,
};
