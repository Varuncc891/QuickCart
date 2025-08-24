export const fetchAnalyticsData = async (token) => {
  const headers = {
    Authorization: `Bearer ${token}`
  };

  const endpoints = [
    'api/users',
    'products/sales-summary',
    'products/top-selling',
    'products/low-stock',
    'cart/last-purchase'
  ];

  const requests = endpoints.map(endpoint => 
    fetch(`http://localhost:5000/${endpoint}`, { headers })
  );

  const responses = await Promise.all(requests);
  const data = await Promise.all(responses.map(res => res.json()));

  return {
    users: data[0].users || [],
    salesSummary: data[1] || [],
    topSelling: data[2] || [],
    lowStock: data[3] || [],
    lastPurchase: data[4] || null
  };
};