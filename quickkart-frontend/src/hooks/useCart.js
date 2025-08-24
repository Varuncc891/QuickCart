import { useState, useEffect, useCallback } from 'react';
import { fetchCartItems, removeCartItem, checkoutCart } from '../api/cart';

export const useCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const loadCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please login to view your cart');
        return;
      }
      const items = await fetchCartItems(token);
      setCartItems(items.map(item => ({
        ...item,
        price: Number(item.price) || 0,
        quantity: Number(item.quantity) || 1
      })));
    } catch (err) {
      setError(err.message || 'Failed to load cart');
    } finally {
      setLoading(false);
    }
  }, []);

  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await removeCartItem(itemId, token);
      await loadCart();
    } catch (err) {
      throw err;
    }
  };

  const checkout = async (address) => {
    try {
      const token = localStorage.getItem('token');
      return await checkoutCart(address, token);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  return {
    cartItems,
    loading,
    error,
    loadCart,
    removeItem,
    checkout,
    totalPrice: cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  };
};