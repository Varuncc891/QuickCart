export const fetchCartItems = async (token) => {
  const response = await fetch('http://localhost:5000/cart', {
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to fetch cart');
  }

  const data = await response.json();
  return Array.isArray(data) ? data : (data.items || []);
};

export const removeCartItem = async (itemId, token) => {
  const response = await fetch(`http://localhost:5000/cart/${itemId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) throw new Error('Failed to remove item');
};

export const checkoutCart = async (address, token) => {
  const response = await fetch('http://localhost:5000/cart/checkout', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      address,
      paymentMethod: 'COD'
    })
  });

  const result = await response.json();
  if (!response.ok) throw new Error(result.message || 'Checkout failed');
  return result;
};