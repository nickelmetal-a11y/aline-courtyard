'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('adminAuth', 'true');
      } else {
        setError('Invalid password');
      }
    } catch (err) {
      setError('Authentication failed');
    }
  };

  useEffect(() => {
    const isAuth = localStorage.getItem('adminAuth') === 'true';
    setIsAuthenticated(isAuth);
  }, []);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-dark flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white mb-2">Admin Portal</h1>
            <p className="text-gold-400">Aline Courtyard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6 bg-gray-900 p-8 rounded-lg border border-gray-800">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 text-white rounded-lg focus:outline-none focus:border-gold-500"
                placeholder="Enter admin password"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gold-600 to-gold-500 text-black font-semibold py-2 rounded-lg hover:from-gold-700 hover:to-gold-600 transition"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-dark p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Admin Dashboard</h1>
            <p className="text-gold-400">Manage your ecommerce business</p>
          </div>
          <button
            onClick={() => {
              localStorage.removeItem('adminAuth');
              setIsAuthenticated(false);
            }}
            className="btn-secondary"
          >
            Logout
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {/* Stats Cards */}
          <div className="luxury-card p-6">
            <h3 className="text-gold-400 text-sm font-semibold mb-2">Total Orders</h3>
            <p className="text-3xl font-bold text-white">--</p>
          </div>
          <div className="luxury-card p-6">
            <h3 className="text-gold-400 text-sm font-semibold mb-2">Revenue</h3>
            <p className="text-3xl font-bold text-white">₹--</p>
          </div>
          <div className="luxury-card p-6">
            <h3 className="text-gold-400 text-sm font-semibold mb-2">Products</h3>
            <p className="text-3xl font-bold text-white">--</p>
          </div>
          <div className="luxury-card p-6">
            <h3 className="text-gold-400 text-sm font-semibold mb-2">Visitors</h3>
            <p className="text-3xl font-bold text-white">--</p>
          </div>
        </div>

        {/* Admin Menu */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link href="/admin/products" className="luxury-card p-8 hover:shadow-gold-500/30 transition">
            <h2 className="text-2xl font-bold text-white mb-3">Products</h2>
            <p className="text-gray-400 mb-6">Add, edit, and manage your product catalog</p>
            <span className="text-gold-400 font-semibold">Manage →</span>
          </Link>

          <Link href="/admin/orders" className="luxury-card p-8 hover:shadow-gold-500/30 transition">
            <h2 className="text-2xl font-bold text-white mb-3">Orders</h2>
            <p className="text-gray-400 mb-6">View and manage customer orders</p>
            <span className="text-gold-400 font-semibold">View →</span>
          </Link>

          <Link href="/admin/inventory" className="luxury-card p-8 hover:shadow-gold-500/30 transition">
            <h2 className="text-2xl font-bold text-white mb-3">Inventory</h2>
            <p className="text-gray-400 mb-6">Track stock levels and updates</p>
            <span className="text-gold-400 font-semibold">Track →</span>
          </Link>

          <Link href="/admin/analytics" className="luxury-card p-8 hover:shadow-gold-500/30 transition">
            <h2 className="text-2xl font-bold text-white mb-3">Analytics</h2>
            <p className="text-gray-400 mb-6">View sales and business metrics</p>
            <span className="text-gold-400 font-semibold">Analyze →</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
