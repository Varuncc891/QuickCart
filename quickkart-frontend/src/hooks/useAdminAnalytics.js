import { useState, useEffect } from 'react';
import { fetchAnalyticsData } from '../api/admin/analytics';

export const useAdminAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    users: [],
    salesSummary: [],
    topSelling: [],
    lowStock: [],
    lastPurchase: null
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('adminToken');
      const data = await fetchAnalyticsData(token);
      setAnalytics(data);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAnalytics();
  }, []);

  return { ...analytics, loading, error, refresh: loadAnalytics };
};