import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdminAnalytics } from '../hooks/useAdminAnalytics';
import { 
  UsersCard,
  SalesSummaryCard, 
  TopSellingCard,
  LowStockCard,
  LastPurchaseCard
} from '../components/admin/AnalyticsCards';
import '../styles/Analytics.css';

const Analytics = () => {
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

  const { 
    users, 
    salesSummary, 
    topSelling, 
    lowStock, 
    lastPurchase,
    loading,
    error,
    refresh
  } = useAdminAnalytics();

  if (loading) return <div className="analytics-container">Loading analytics...</div>;
  if (error) return <div className="analytics-container">Error: {error}</div>;

  return (
    <div className="analytics-container">
      <h1>Admin Analytics Dashboard</h1>
      <button onClick={refresh} className="refresh-btn">
        ↻ Refresh Data
      </button>
      
      <div className="analytics-grid">
        <UsersCard users={users} />
        <SalesSummaryCard salesSummary={salesSummary} />
        <TopSellingCard topSelling={topSelling} />
        <LowStockCard lowStock={lowStock} />
        <LastPurchaseCard lastPurchase={lastPurchase} />
      </div>
    </div>
  );
};

export default Analytics;
