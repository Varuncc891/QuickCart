import React from 'react';
import { useNavigate } from 'react-router-dom';

export const AdminHeader = ({ title = 'Admin Portal' }) => {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="left">{title}</div>
      <div className="right" onClick={() => navigate('/admin-dashboard')}>
        Home
      </div>
    </div>
  );
};