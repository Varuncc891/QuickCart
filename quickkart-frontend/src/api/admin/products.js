export const getProducts = async () => {
  const response = await fetch('http://localhost:5000/products', {
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

export const addProduct = async (productData) => {
  const response = await fetch('http://localhost:5000/admin/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    },
    body: JSON.stringify(productData)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to add product');
  }
  return response.json();
};

export const deleteProduct = async (productId, token) => {
  try {
    const response = await fetch(`http://localhost:5000/admin/products/${productId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to delete product');
    }
    return await response.json();
  } catch (err) {
    console.error('Delete product error:', err);
    throw err;
  }
};

export const updateProduct = async (productId, updates) => {
  const response = await fetch(`http://localhost:5000/admin/products/${productId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    },
    body: JSON.stringify(updates)
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to update product');
  }
  return response.json();
};

export const increaseProductQuantity = async (productId) => {
  const response = await fetch(`http://localhost:5000/admin/products/${productId}/increase`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to increase quantity');
  }
  return response.json();
};

export const decreaseProductQuantity = async (productId) => {
  const response = await fetch(`http://localhost:5000/admin/products/${productId}/decrease`, {
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
    }
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || 'Failed to decrease quantity');
  }
  return response.json();
};