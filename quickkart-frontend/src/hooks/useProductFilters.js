import { useState, useEffect } from 'react';

export const useProductFilters = (initialProducts = []) => {
  const [products, setProducts] = useState(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [sortOrder, setSortOrder] = useState(null);
  const [priceRange, setPriceRange] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    let filtered = [...products];
    
    // Price filter
    if (priceRange) {
      const [min, max] = priceRange;
      filtered = filtered.filter(p => p.price >= min && (max === null || p.price <= max));
    }
    
    // Sort
    if (sortOrder === 'low') filtered.sort((a, b) => a.price - b.price);
    else if (sortOrder === 'high') filtered.sort((a, b) => b.price - a.price);
    
    // Search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(p => p.name.toLowerCase().includes(query));
    }
    
    setFilteredProducts(filtered);
  }, [products, sortOrder, priceRange, searchQuery]);

  return {
    products,
    setProducts,
    filteredProducts,
    sortOrder,
    setSortOrder,
    priceRange,
    setPriceRange,
    searchQuery,
    setSearchQuery
  };
};