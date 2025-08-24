import React from 'react';

export const ProductCard = ({ 
  product, 
  onIncrease, 
  onDecrease, 
  onDelete 
}) => (
  <div className="product-card">
    <h3>{product.name}</h3>
    <p>₹ {product.price}</p>
    <p>Quantity: {product.quantity}</p>
    <div className="product-actions">
      <button 
        onClick={() => onIncrease(product._id)}
        className="increase-btn"
      >
        Increase (+1)
      </button>
      <button 
        onClick={() => onDecrease(product._id)}
        disabled={product.quantity <= 0}
      >
        Decrease (-1)
      </button>
      <button 
        className="delete-btn"
        onClick={() => onDelete(product._id)}
      >
        Delete
      </button>
    </div>
  </div>
);