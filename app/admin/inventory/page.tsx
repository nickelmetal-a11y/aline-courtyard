'use client';

import Link from 'next/link';
import productData from '@/data/products.json';
import { useState, useEffect } from 'react';

interface Product {
  id: string;
  name: string;
  stock: number;
  category: string;
}

export default function InventoryAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [lowStockOnly, setLowStockOnly] = useState(false);

  useEffect(() => {
    setProducts(productData.products);
  }, []);

  const lowStockProducts = products.filter(p => p.stock < 10);
  const displayProducts = lowStockOnly ? lowStockProducts : products;

  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const lowStockCount = lowStockProducts.length;

  return (
    <div className="min-h-screen bg-gradient-dark p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/admin" className="text-gold-400 mb-4 inline-block">← Back to Dashboard</Link>
          <h1 className="text-4xl font-bold text-white">Inventory Management</h1>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="luxury-card p-6">
            <h3 className="text-gold-400 text-sm font-semibold mb-2">Total Stock</h3>
            <p className="text-4xl font-bold text-white">{totalStock}</p>
          </div>
          <div className="luxury-card p-6">
            <h3 className="text-gold-400 text-sm font-semibold mb-2">Products</h3>
            <p className="text-4xl font-bold text-white">{products.length}</p>
          </div>
          <div className="luxury-card p-6">
            <h3 className="text-red-400 text-sm font-semibold mb-2">Low Stock (&lt;10)</h3>
            <p className="text-4xl font-bold text-red-400">{lowStockCount}</p>
          </div>
        </div>

        {/* Filter */}
        <div className="mb-6">
          <label className="flex items-center text-white cursor-pointer">
            <input
              type="checkbox"
              checked={lowStockOnly}
              onChange={(e) => setLowStockOnly(e.target.checked)}
              className="w-4 h-4 mr-3"
            />
            Show low stock items only
          </label>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="text-left py-4 px-4">Product</th>
                <th className="text-left py-4 px-4">Category</th>
                <th className="text-left py-4 px-4">Stock Level</th>
                <th className="text-left py-4 px-4">Status</th>
                <th className="text-left py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {displayProducts.map((product) => (
                <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                  <td className="py-4 px-4 font-semibold">{product.name}</td>
                  <td className="py-4 px-4 text-gray-400">{product.category}</td>
                  <td className="py-4 px-4 font-bold">{product.stock}</td>
                  <td className="py-4 px-4">
                    <span className={`px-3 py-1 rounded text-sm ${
                      product.stock === 0 ? 'bg-red-900 text-red-300' :
                      product.stock < 10 ? 'bg-yellow-900 text-yellow-300' :
                      'bg-green-900 text-green-300'
                    }`}>
                      {product.stock === 0 ? 'Out of Stock' :
                       product.stock < 10 ? 'Low Stock' :
                       'In Stock'}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-gold-400 hover:text-gold-300">Update Stock</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
