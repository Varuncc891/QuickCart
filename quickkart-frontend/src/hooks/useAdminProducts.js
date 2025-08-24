import { useState, useEffect, useCallback } from 'react';
import { 
  getProducts, 
  increaseProductQuantity, 
  decreaseProductQuantity, 
  deleteProduct 
} from '../api/admin/products';

export const useAdminProducts = (token) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadProducts = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getProducts(token);
      setProducts(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [token]);

  const increaseQuantity = async (productId) => {
    try {
      await increaseProductQuantity(productId, token);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const decreaseQuantity = async (productId) => {
    try {
      await decreaseProductQuantity(productId, token);
      await loadProducts();
    } catch (err) {
      setError(err.message);
    }
  };

  const removeProduct = async (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(productId, token);
        await loadProducts();
      } catch (err) {
        setError(err.message);
      }
    }
  };

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    increaseQuantity,
    decreaseQuantity,
    deleteProduct: removeProduct,
    reloadProducts: loadProducts
  };
};