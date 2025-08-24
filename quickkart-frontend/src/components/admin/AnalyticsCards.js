import React from 'react';
import PropTypes from 'prop-types';

export const UsersCard = ({ users }) => (
  <div className="analytics-box users-box">
    <h2>Total Registered Users: {users.length}</h2>
    <div className="scroll-list">
      {users.map((user) => (
        <p key={user._id}>• {user.email}</p>
      ))}
    </div>
  </div>
);

export const SalesSummaryCard = ({ salesSummary }) => {
  const summary = Array.isArray(salesSummary) ? salesSummary : [];

  return (
    <div className="analytics-box sales-box">
      <h2>Total Products Sold: {summary.reduce((sum, item) => sum + (item.totalSold || 0), 0)}</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {summary.map((item, i) => (
            <tr key={i}>
              <td>{item._id}</td>
              <td>{item.totalSold}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export const TopSellingCard = ({ topSelling }) => {
  const top = Array.isArray(topSelling) ? topSelling : [];

  return (
    <div className="analytics-box top-selling-box">
      <h2>Top Selling Products</h2>
      {top.map((item, i) => (
        <div key={i} className="bar-container">
          <span>{item._id}</span>
          <div className="bar">
            <div className="bar-fill" style={{ width: `${(item.sold || 0) * 10}px` }}>
              {item.sold}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export const LowStockCard = ({ lowStock }) => (
  <div className="analytics-box low-stock-box">
    <h2>Low Stock Alerts (Qty less than 3)</h2>
    <ul>
      {lowStock.map((item, i) => (
        <li key={i}>
          {item.name} - Only {item.quantity} left
        </li>
      ))}
    </ul>
  </div>
);

export const LastPurchaseCard = ({ lastPurchase }) => (
  <div className="analytics-box last-purchase-box">
    <h2>Last Purchased Product</h2>
    {lastPurchase ? (
      <p>
        {lastPurchase.buyer} bought <strong>{lastPurchase.product}</strong>
      </p>
    ) : (
      <p>No purchases yet</p>
    )}
  </div>
);

UsersCard.propTypes = {
  users: PropTypes.array.isRequired
};

SalesSummaryCard.propTypes = {
  salesSummary: PropTypes.array.isRequired
};

TopSellingCard.propTypes = {
  topSelling: PropTypes.array.isRequired
};

LowStockCard.propTypes = {
  lowStock: PropTypes.array.isRequired
};

LastPurchaseCard.propTypes = {
  lastPurchase: PropTypes.object
};