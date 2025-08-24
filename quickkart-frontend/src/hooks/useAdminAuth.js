import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { adminLogin } from '../api/admin/auth';

export const useAdminAuth = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const login = async (username, password) => {
    try {
      const token = await adminLogin(username, password);
      localStorage.setItem('adminToken', token);
      navigate('/admin-dashboard');
    } catch (err) {
      setError('Wrong username or password');
      console.error('Login error:', err.message);
    }
  };

  return { error, login };
};