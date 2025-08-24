import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/Home'; 
import Login from './pages/Login';
import Register from './pages/Register';
import ProductList from './pages/ProductList';
import Cart from './pages/Cart';
import SuccessPage from './pages/SuccessPage';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import SellPage from './pages/SellPage';
import Analytics from './pages/Analytics';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} /> 
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/adminlogin" element={<AdminLogin/>} />
        <Route path="/success" element={<SuccessPage />} />
        <Route path="/admin-dashboard" element={<AdminDashboard/>} />
        <Route path="/admin/add-product" element={<SellPage/>} />
        <Route path="/admin/analytics" element={<Analytics/>} />

      </Routes>
    </Router>
  );
}

export default App;
