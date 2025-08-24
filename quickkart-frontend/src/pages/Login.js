import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/userApi';
import '../styles/Login.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const data = await loginUser(email, password);
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('loginTime', Date.now());
        navigate('/products');
      } else {
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bodyo">
      <nav className="navbar">
        <div className="logo">QuickCart</div>
        <div className="nav-links">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/register" className="nav-link">Register</Link>
        </div>
      </nav>

      <div className="main-area">
        <div className="info-text">
          <p>
            <strong>Welcome Back!<br /><br />Your Marketplace. Simple and Clear.</strong><br /><br />
            Create an account, list your products, or start shopping in minutes.
            With QuickCart, you can manage your items, add up to 5 products to your cart,
            and track stock levels in real time.
          </p>
        </div>
        
        <div className="insidebox">
          <h2 className="login">LOGIN</h2>
          {error && <p className="error">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="boxone">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
              />
            </div>
            <div className="boxone">
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="boxone">
              <button type="submit" disabled={isLoading}>
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
          <div className="newto">
            New to QuickKart? <Link to="/register" className="register-link">Register now!</Link>
          </div>
        </div>
      </div>
      <div className="foter">© 2025 QuickKart</div>
    </div>
  );
}