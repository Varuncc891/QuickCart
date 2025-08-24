import React from 'react';

const priceRanges = [
  [0, 999],
  [1000, 4999],
  [5000, 14999],
  [15000, 29999],
  [30000, null]
];

export const FilterSortBox = ({ 
  sortOrder, 
  setSortOrder, 
  priceRange, 
  setPriceRange,
  searchQuery,
  setSearchQuery
}) => {
  const handlePriceFilterClick = (range) => {
    setPriceRange(JSON.stringify(priceRange) === JSON.stringify(range) ? null : range);
  };

  return (
    <div className="filter-sort-box">
      <div className="sort-section">
        <h3>SORT ⬍</h3>
        <button 
          className={sortOrder === 'low' ? 'active' : ''} 
          onClick={() => setSortOrder(sortOrder === 'low' ? null : 'low')}
        >
          Prices: Low to High
        </button>
        <button 
          className={sortOrder === 'high' ? 'active' : ''} 
          onClick={() => setSortOrder(sortOrder === 'high' ? null : 'high')}
        >
          Prices: High to Low
        </button>
      </div>
      <hr />
      <div className="filter-section">
        <h3>FILTER</h3>
        {priceRanges.map(range => (
          <button 
            key={range[0]} 
            className={JSON.stringify(priceRange) === JSON.stringify(range) ? 'active' : ''} 
            onClick={() => handlePriceFilterClick(range)}
          >
            ₹{range[0]} {range[1] ? `– ₹${range[1]}` : '+'}
          </button>
        ))}
      </div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        {searchQuery && (
          <button className="clear-btn" onClick={() => setSearchQuery('')}>
            ❌
          </button>
        )}
      </div>
    </div>
  );
};