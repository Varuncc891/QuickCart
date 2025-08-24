import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchProducts, addToCart } from '../api/products';
import ProductCard from '../components/products/ProductCard';
import { FilterSortBox } from '../components/admin/FilterSortBox';
import '../styles/ProductList.css';

function ProductList() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true }); 
      return;
    }

    setIsLoading(true);
    fetchProducts()
      .then(data => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
        if (error.message.includes('auth') || error.message.includes('token') || error.response?.status === 401) {
          localStorage.removeItem('token');
          navigate('/login', { replace: true });
        }
      })
      .finally(() => setIsLoading(false));
  }, [navigate]);

  useEffect(() => {
    let results = [...products];
    
    if (priceRange) {
      const [min, max] = priceRange;
      results = results.filter(p => p.price >= min && (max === null || p.price <= max));
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      results = results.filter(p => p.name.toLowerCase().includes(query));
    }

    if (sortOrder === 'low') {
      results.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'high') {
      results.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(results);
  }, [products, sortOrder, priceRange, searchQuery]);

  const handleBuy = async (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add items to cart');
      navigate('/login');
      return;
    }

    try {
      if (product.quantity <= 0) {
        alert('This product is out of stock');
        return;
      }

      await addToCart(product._id, token);
      alert('Item added to cart!');
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
    } catch (error) {
      alert(error.message.includes('Cart limit') 
        ? 'Cart limit reached (max 5 items)' 
        : 'Failed to add to cart');
    }
  };

  const token = localStorage.getItem('token');
  if (!token) {
    navigate('/login', { replace: true });
    return null; 
  }

  return (
    <div className="page-container">
      <div className="header">
        <h2>QuickCart</h2>
        <div className="header-buttons">
          <button className="cart-btn" onClick={() => navigate('/cart')}>
            Cart 🛒
          </button>
          <button 
            className="logout-btn" 
            onClick={() => {
              localStorage.removeItem('token');
              navigate('/login', { replace: true });
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div className="content">
        {isLoading ? (
          <p>Loading products...</p>
        ) : (
          <>
            <FilterSortBox
              sortOrder={sortOrder}
              setSortOrder={setSortOrder}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />

            <div className="product-list">
              <div className="product-grid">
                {filteredProducts.map(product => (
                  <ProductCard
                    key={product._id}
                    product={product}
                    onBuy={handleBuy}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default ProductList;