import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartItem, AddressForm } from '../components/CartComponents';
import { useAuthRedirect } from '../hooks/useAuthRedirect';
import { useCart } from '../hooks/useCart';
import '../styles/Cart.css';

function Cart() {
  const navigate = useNavigate();

  useAuthRedirect('user');

  const {
    cartItems,
    loading,
    error,
    loadCart,
    removeItem,
    checkout,
    totalPrice
  } = useCart();

  const [address, setAddress] = useState({
    fullName: '', mobile: '', pincode: '', house: '',
    street: '', city: '', state: ''
  });

  const [cashSelected, setCashSelected] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setAddress(prev => ({ ...prev, [name]: value }));
  };

  const validateAddress = () => {
    return Object.values(address).every(val => val.trim() !== '');
  };

  const handleCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty');
      return;
    }

    if (!validateAddress()) {
      alert('Please fill all address fields');
      return;
    }

    if (!cashSelected) {
      alert('Please select Cash on Delivery');
      return;
    }

    setCheckoutLoading(true);
    try {
      await checkout(address);
      navigate('/success');
    } catch (err) {
      alert(`Checkout failed: ${err.message}`);
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <div>
      <header className="header">
        <h1>QuickCart</h1>
        <nav><a className="hefje" href="/products">Home</a></nav>
      </header>

      <div className="cart-page">
        <div className="cart-left">
          {loading ? (
            <p>Loading cart items...</p>
          ) : error ? (
            <div>
              <p className="error-message">{error}</p>
              <button onClick={loadCart}>Retry</button>
            </div>
          ) : cartItems.length === 0 ? (
            <p>No items in cart. Add products from homepage.</p>
          ) : (
            <div className="cart-grid">
              {cartItems.map(item => (
                <CartItem 
                  key={item._id} 
                  item={item} 
                  onRemove={removeItem} 
                />
              ))}
              <p className="total">Total: ₹ {totalPrice.toFixed(2)}</p>
            </div>
          )}
        </div>

        <div className="cart-right">
          <h3>Delivery Address</h3>
          <AddressForm address={address} onChange={handleAddressChange} />
          <br />
          <h3>Payment Method</h3>
          <p><strong>UPI/Net Banking</strong> unavailable due to regulations.</p>
          <label>
            <input
              type="checkbox"
              checked={cashSelected}
              onChange={() => setCashSelected(!cashSelected)}
            />
            &nbsp;Cash on Delivery
          </label>
          <button
            className="pay-button"
            onClick={handleCheckout}
            disabled={cartItems.length === 0 || checkoutLoading}
          >
            {checkoutLoading ? 'Processing...' : 'Place Order'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
