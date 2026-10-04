import React from 'react';

interface SearchFiltersProps {
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
  selectedCategory?: string;
  onCategoryChange?: (category: string) => void;
  minPrice?: string;
  onMinPriceChange?: (price: string) => void;
  maxPrice?: string;
  onMaxPriceChange?: (price: string) => void;
}

export default function SearchFilters({
  searchTerm = '',
  onSearchChange = () => {},
  selectedCategory = 'all',
  onCategoryChange = () => {},
  minPrice = '',
  onMinPriceChange = () => {},
  maxPrice = '',
  onMaxPriceChange = () => {},
}: SearchFiltersProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-md mb-6 space-y-4 md:space-y-0 md:flex md:items-center md:gap-4">
      {/* Search Input */}
      <div className="flex-1">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
          Search
        </label>
        <input
          id="search"
          type="text"
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search listings..."
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Property Category Select */}
      <div className="w-full md:w-48">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
          Category
        </label>
        <select
          id="category"
          value={selectedCategory}
          onChange={(e) => onCategoryChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
        >
          <option value="all">All Categories</option>
          <option value="house">House</option>
          <option value="apartment">Apartment</option>
          <option value="condo">Condo</option>
          <option value="townhouse">Townhouse</option>
        </select>
      </div>

      {/* Price Range Filters */}
      <div className="flex gap-2 w-full md:w-64">
        <div className="w-1/2">
          <label htmlFor="minPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Min Price
          </label>
          <input
            id="minPrice"
            type="number"
            value={minPrice}
            onChange={(e) => onMinPriceChange(e.target.value)}
            placeholder="$ Min"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="w-1/2">
          <label htmlFor="maxPrice" className="block text-sm font-medium text-gray-700 mb-1">
            Max Price
          </label>
          <input
            id="maxPrice"
            type="number"
            value={maxPrice}
            onChange={(e) => onMaxPriceChange(e.target.value)}
            placeholder="$ Max"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
  );
}