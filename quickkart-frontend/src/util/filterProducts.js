export const filterProducts = (products, { sortOrder, priceRange, searchQuery }) => {
  let filtered = [...products];

  if (priceRange) {
    const [min, max] = priceRange;
    filtered = filtered.filter(p => p.price >= min && (max === null || p.price <= max));
  }

  if (searchQuery.trim()) {
    const query = searchQuery.toLowerCase();
    filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
  }

  if (sortOrder === 'low') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortOrder === 'high') {
    filtered.sort((a, b) => b.price - a.price);
  }

  return filtered;
};