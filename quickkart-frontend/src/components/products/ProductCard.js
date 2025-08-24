import React from 'react';
import PropTypes from 'prop-types';

const ProductCard = ({ product, onBuy }) => (
  <div className="product-card">
    <h3>{product.name}</h3>
    <p>₹ {product.price}</p>
    <p>Quantity: {product.quantity}</p>
    <button
      onClick={() => onBuy(product)}
      disabled={product.quantity === 0}
    >
      {product.quantity === 0 ? 'Out of Stock' : 'Add to Cart'}
    </button>
  </div>
);

ProductCard.propTypes = {
  product: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired,
  onBuy: PropTypes.func.isRequired
};

export default ProductCard;