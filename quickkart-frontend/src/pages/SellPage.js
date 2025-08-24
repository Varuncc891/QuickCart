import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addProduct as adminAddProduct } from '../api/admin/products';
import { AdminHeader } from '../components/common/AdminHeader';
import { ProductForm } from '../components/products/ProductForm';
import '../styles/SellPage.css';

const SellPage = ({ onProductAdded }) => {
  const [product, setProduct] = useState({ 
    name: '', 
    price: '', 
    quantity: '' 
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await adminAddProduct({
        ...product,
        price: Number(product.price),
        quantity: Number(product.quantity)
      }, localStorage.getItem('adminToken'));
      alert('Product added successfully');
      setProduct({ name: '', price: '', quantity: '' });
      navigate('/admin-dashboard');

      if (typeof onProductAdded === 'function') {
        onProductAdded();
      }
    } catch (err) {
      alert(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AdminHeader title="Add Products" />
      <div className="sell-container">
        <h2>Add a Product</h2>
        <ProductForm
          product={product}
          onSubmit={handleSubmit}
          onChange={handleChange}
          isLoading={isLoading}
        />
      </div>
    </>
  );
};

export default SellPage;
