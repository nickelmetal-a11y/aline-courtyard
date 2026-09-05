'use client';

import { useState, useMemo } from 'react';
import productData from '@/data/products.json';
import ProductCard from '@/components/ProductCard';

type SortOption = 'featured' | 'price-low' | 'price-high' | 'name' | 'newest';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [searchTerm, setSearchTerm] = useState('');

  // Get unique categories
  const categories = useMemo(() => {
    const cats = new Set(productData.products.map(p => p.category));
    return Array.from(cats).sort();
  }, []);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = productData.products;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(p => p.category === selectedCategory);
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.material.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by price (using retail price)
    filtered = filtered.filter(p => {
      const retailPrice = p.wholesalePrice * 1.5 * 1.05;
      return retailPrice >= priceRange[0] && retailPrice <= priceRange[1];
    });

    // Sort products
    const sorted = [...filtered];
    switch (sortBy) {
      case 'price-low':
        sorted.sort((a, b) => (a.wholesalePrice * 1.5 * 1.05) - (b.wholesalePrice * 1.5 * 1.05));
        break;
      case 'price-high':
        sorted.sort((a, b) => (b.wholesalePrice * 1.5 * 1.05) - (a.wholesalePrice * 1.5 * 1.05));
        break;
      case 'name':
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'newest':
        sorted.reverse();
        break;
      case 'featured':
      default:
        sorted.sort((a, b) => {
          if (a.featured === b.featured) return 0;
          return a.featured ? -1 : 1;
        });
    }

    return sorted;
  }, [selectedCategory, searchTerm, priceRange, sortBy]);

  const maxRetailPrice = Math.max(
    ...productData.products.map(p => p.wholesalePrice * 1.5 * 1.05)
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="section-container">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">
            Discover our complete collection of handcrafted gifts and festive items.
          </p>
        </div>

        {/* Filters & Sorting */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          {/* Search Bar */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Search Products
            </label>
            <input
              type="text"
              placeholder="Search by name, material, or description..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Category Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Category
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
              >
                <option value="all">All Categories</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Price Range Filter */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Price Range: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="0"
                  max={Math.ceil(maxRetailPrice)}
                  value={priceRange[1]}
                  onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="w-full"
                />
                <div className="text-xs text-gray-500">
                  Max: ₹{Math.ceil(maxRetailPrice)}
                </div>
              </div>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
                <option value="newest">Newest</option>
              </select>
            </div>

            {/* Results Count */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Results</p>
              <p className="text-lg font-bold text-gold-600">
                {filteredProducts.length} Products
              </p>
            </div>
          </div>

          {/* Clear Filters */}
          {(selectedCategory !== 'all' || searchTerm || priceRange[1] < Math.ceil(maxRetailPrice)) && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <button
                onClick={() => {
                  setSelectedCategory('all');
                  setSearchTerm('');
                  setPriceRange([0, Math.ceil(maxRetailPrice)]);
                }}
                className="text-gold-600 hover:text-gold-700 font-semibold text-sm"
              >
                Clear All Filters
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        {filteredProducts.length > 0 ? (
          <div className="product-grid">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-lg">
            <p className="text-gray-600 text-lg mb-4">No products found matching your criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
                setPriceRange([0, Math.ceil(maxRetailPrice)]);
              }}
              className="text-gold-600 hover:text-gold-700 font-semibold"
            >
              Clear filters and try again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
