import React, { useState } from 'react';
import { useAdminAuth } from '../hooks/useAdminAuth';
import { LoginForm } from '../components/admin/AdminLoginForm';
import '../styles/Login.css';

export default function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { error, login } = useAdminAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="bodyo">
      <nav className="navbar">
        <div className="logo">QuickCart</div>
      </nav>

      <div className="main-area">
        <div className="info-text">
          <p><strong>Admin Panel</strong></p>
          <div className="info-text">
            <p>
              <strong>Welcome Back!</strong><br /><br />
              Access user analytics, manage products, and view recent purchases.
            </p>
          </div>
        </div>

        <LoginForm
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          error={error}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}