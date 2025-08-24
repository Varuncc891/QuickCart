const User = require('../models/user');
const Product = require('../models/product');
const Purchase = require('../models/purchase');

const getUsers = async (req, res) => {
  try {
    const users = await User.find({}, 'email');
    res.json({ users, total: users.length });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch users', error: error.message });
  }
};

/**
 * Generates sales summary using MongoDB aggregation
 * Groups by product name and calculates total quantities sold
 */
const getSalesSummary = async (req, res) => {
  try {
    const sales = await Purchase.aggregate([
      { $group: { _id: '$name', totalSold: { $sum: '$quantity' } } },
      { $sort: { totalSold: -1 } }
    ]);
    res.json(Array.isArray(sales) ? sales : []);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch sales summary', error: error.message });
  }
};

/**
 * Retrieves top 5 best-selling products
 * Uses aggregation pipeline for efficient sorting and limiting
 */
const getTopSelling = async (req, res) => {
  try {
    const topSelling = await Purchase.aggregate([
      { $group: { _id: '$name', sold: { $sum: '$quantity' } } },
      { $sort: { sold: -1 } },
      { $limit: 5 }
    ]);
    res.json(Array.isArray(topSelling) ? topSelling : []);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch top selling products', error: error.message });
  }
};

const getLowStock = async (req, res) => {
  try {
    const lowStock = await Product.find({ quantity: { $lt: 3 } });
    res.json(Array.isArray(lowStock) ? lowStock : []);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch low stock products', error: error.message });
  }
};

const getLastPurchase = async (req, res) => {
  try {
    const last = await Purchase.findOne().sort({ purchasedAt: -1 });
    if (!last) return res.status(404).json({ message: 'No purchases found' });

    const user = await User.findById(last.userId);
    res.json({ product: last.name, buyer: user?.username || 'Unknown' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch last purchase', error: error.message });
  }
};

module.exports = {
  getUsers,
  getSalesSummary,
  getTopSelling,
  getLowStock,
  getLastPurchase,
};
