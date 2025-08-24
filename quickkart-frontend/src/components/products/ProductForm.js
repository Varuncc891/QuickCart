import React from 'react';
import PropTypes from 'prop-types';

export const ProductForm = ({
  product,
  onSubmit,
  onChange,
  buttonText = 'Add Product',
  isLoading = false
}) => (
  <form onSubmit={onSubmit} className="sell-form">
    <input
      type="text"
      name="name"
      placeholder="Product Name"
      value={product.name}
      onChange={onChange}
      required
    />
    <input
      type="number"
      name="price"
      placeholder="Price"
      value={product.price}
      onChange={onChange}
      required
      min="0"
      step="0.01"
    />
    <input
      type="number"
      name="quantity"
      placeholder="Quantity"
      value={product.quantity}
      onChange={onChange}
      required
      min="0"
    />
    <button type="submit" disabled={isLoading}>
      {isLoading ? 'Processing...' : buttonText}
    </button>
  </form>
);

ProductForm.propTypes = {
  product: PropTypes.shape({
    name: PropTypes.string,
    price: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    quantity: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }).isRequired,
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  buttonText: PropTypes.string,
  isLoading: PropTypes.bool
};