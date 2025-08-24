import React from 'react';
import PropTypes from 'prop-types';

export const AuthForm = ({ 
  isLogin = false,
  email,
  setEmail,
  password,
  setPassword,
  name,
  setName,
  onSubmit,
  isLoading
}) => (
  <form className="auth-box" onSubmit={onSubmit}>
    <h2>{isLogin ? 'Login' : 'Create Account'}</h2>
    
    {!isLogin && (
      <input
        type="text"
        placeholder="Full Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
    )}

    <input
      type="email"
      placeholder="Email Address"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />

    <input
      type="password"
      placeholder={isLogin ? 'Password' : 'Create Password'}
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      required
    />

    <button type="submit" disabled={isLoading}>
      {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Register'}
    </button>

    <div className="auth-link">
      {isLogin ? (
        <>Don't have an account? <a href="/register">Register</a></>
      ) : (
        <>Already have an account? <a href="/login">Login</a></>
      )}
    </div>
  </form>
);

AuthForm.propTypes = {
  isLogin: PropTypes.bool,
  email: PropTypes.string.isRequired,
  setEmail: PropTypes.func.isRequired,
  password: PropTypes.string.isRequired,
  setPassword: PropTypes.func.isRequired,
  name: PropTypes.string,
  setName: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  isLoading: PropTypes.bool
};