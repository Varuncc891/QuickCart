import React, { useState, useEffect } from 'react';  
import { useNavigate } from 'react-router-dom';
import { useAdminProducts } from '../hooks/useAdminProducts';
import { FilterSortBox } from '../components/admin/FilterSortBox';
import { ProductCard } from '../components/admin/ProductCard';
import { filterProducts } from '../util/filterProducts';
import '../styles/AdminDashboard.css';

function AdminDashboard() {
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/adminlogin');
      return;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.role !== 'admin') {
        localStorage.removeItem('adminToken');
        navigate('/adminlogin');
      }
    } catch (error) {
      localStorage.removeItem('adminToken');
      navigate('/adminlogin');
    }
  }, [navigate]);

  const {
    products,
    loading,
    error,
    increaseQuantity,
    decreaseQuantity,
    deleteProduct,
    reloadProducts
  } = useAdminProducts(localStorage.getItem('adminToken'));

  const filteredProducts = filterProducts(products, {
    sortOrder,
    priceRange,
    searchQuery
  });

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    navigate('/adminlogin');
  };

  return (
    <div className="page-container">
      <div className="header">
        <h2>Admin Dashboard</h2>
        <div className="header-buttons">
          <button onClick={() => navigate('/')}>Home</button>
          <button onClick={() => navigate('/admin/analytics')}>Analytics</button>
          <button className="cart-btn" onClick={() => navigate('/admin/add-product')}>
            Add Product
          </button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>

      <div className="content">
        {loading ? (
          <p>Loading products...</p>
        ) : error ? (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={reloadProducts}>Retry</button>
          </div>
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
                    onIncrease={increaseQuantity}
                    onDecrease={decreaseQuantity}
                    onDelete={deleteProduct}
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

export default AdminDashboard;