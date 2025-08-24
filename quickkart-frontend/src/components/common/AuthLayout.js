import React from 'react';
import PropTypes from 'prop-types';

export const AuthLayout = ({ 
  title, 
  description,
  children 
}) => (
  <div className="auth-body">
    <header className="header">
      <div className="logo">QuickCart</div>
      <nav className="nav-links">
        <a href="/">Home</a>
      </nav>
    </header>

    <div className="auth-left-text">
      <h1>{title}</h1>
      <p>{description}</p>
    </div>

    {children}

    <footer className="footer">
      © 2025 QuickKart. All rights reserved.
    </footer>
  </div>
);

AuthLayout.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired
};