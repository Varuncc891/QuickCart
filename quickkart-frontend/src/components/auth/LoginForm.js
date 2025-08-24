import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export const LoginForm = ({
  email,
  setEmail,
  password,
  setPassword,
  onSubmit,
  isLoading
}) => (
  <div className="insidebox">
    <h2 className="login">LOGIN</h2>
    <form onSubmit={onSubmit}>
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
);

LoginForm.propTypes = {
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};