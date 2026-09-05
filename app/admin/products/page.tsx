'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import productData from '@/data/products.json';

interface Product {
  id: string;
  name: string;
  category: string;
  wholesalePrice: number;
  stock: number;
  featured: boolean;
}

export default function ProductsAdmin() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    wholesalePrice: 0,
    stock: 0,
  });

  useEffect(() => {
    setProducts(productData.products);
  }, []);

  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: Date.now().toString(),
      ...formData,
      featured: false,
    };
    setProducts([...products, newProduct]);
    setFormData({ name: '', category: '', wholesalePrice: 0, stock: 0 });
    setShowForm(false);
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(products.filter(p => p.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-dark p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link href="/admin" className="text-gold-400 mb-4 inline-block">← Back to Dashboard</Link>
            <h1 className="text-4xl font-bold text-white">Product Management</h1>
          </div>
          <button
            onClick={() => setShowForm(!showForm)}
            className="btn-primary"
          >
            {showForm ? 'Cancel' : 'Add Product'}
          </button>
        </div>

        {showForm && (
          <div className="luxury-card p-8 mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Add New Product</h2>
            <form onSubmit={handleAddProduct} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Product Name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
                  required
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Wholesale Price"
                  value={formData.wholesalePrice}
                  onChange={(e) => setFormData({...formData, wholesalePrice: parseFloat(e.target.value)})}
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
                  required
                />
                <input
                  type="number"
                  placeholder="Stock"
                  value={formData.stock}
                  onChange={(e) => setFormData({...formData, stock: parseInt(e.target.value)})}
                  className="bg-gray-800 border border-gray-700 text-white px-4 py-2 rounded"
                  required
                />
              </div>
              <button type="submit" className="btn-primary">Save Product</button>
            </form>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="w-full text-white">
            <thead className="border-b border-gray-700">
              <tr>
                <th className="text-left py-4 px-4">Product Name</th>
                <th className="text-left py-4 px-4">Category</th>
                <th className="text-left py-4 px-4">Wholesale Price</th>
                <th className="text-left py-4 px-4">Stock</th>
                <th className="text-left py-4 px-4">Retail Price</th>
                <th className="text-left py-4 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => {
                const retailPrice = product.wholesalePrice * 1.5 * 1.05;
                return (
                  <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                    <td className="py-4 px-4">{product.name}</td>
                    <td className="py-4 px-4 text-gray-400">{product.category}</td>
                    <td className="py-4 px-4">₹{product.wholesalePrice.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className={product.stock > 0 ? 'text-green-400' : 'text-red-400'}>
                        {product.stock}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gold-400">₹{retailPrice.toFixed(2)}</td>
                    <td className="py-4 px-4 space-x-2">
                      <button className="text-gold-400 hover:text-gold-300">Edit</button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="text-red-400 hover:text-red-300"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
