import React from 'react';
import PropTypes from 'prop-types';

// Cart Item Component
export const CartItem = ({ item, onRemove }) => (
  <div className="cart-card">
    <h3>{item.name}</h3>
    <p>₹ {item.price.toFixed(2)}</p>
    <p>Quantity: {item.quantity}</p>
    <button onClick={() => onRemove(item._id)}>Remove</button>
  </div>
);

CartItem.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired
  }).isRequired,
  onRemove: PropTypes.func.isRequired
};

// Address Form Component
export const AddressForm = ({ address, onChange }) => {
  const fieldLabels = {
    fullName: 'Full Name',
    mobile: 'Mobile Number',
    pincode: 'Pincode',
    house: 'House Number',
    street: 'Street',
    city: 'City',
    state: 'State'
  };

  return (
    <form className="address-form">
      {Object.keys(address).map(field => (
        <input
          key={field}
          type={field === 'mobile' ? 'tel' : 'text'}
          name={field}
          placeholder={fieldLabels[field]}
          value={address[field]}
          onChange={onChange}
          required
        />
      ))}
    </form>
  );
};

AddressForm.propTypes = {
  address: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired
};