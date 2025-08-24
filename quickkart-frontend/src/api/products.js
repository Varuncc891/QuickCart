export const fetchProducts = async () => {
  const response = await fetch('http://localhost:5000/products');
  if (!response.ok) throw new Error("Product fetch failed");
  return await response.json();
};

export const addToCart = async (productId, token) => {
  const response = await fetch('http://localhost:5000/cart', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ productId })
  });
  const data = await response.json();
  if (!response.ok) throw new Error(data.message || "Failed to add to cart");
  return data;
};