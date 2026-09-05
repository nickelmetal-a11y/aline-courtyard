'use client';

import Link from 'next/link';

export default function AnalyticsAdmin() {
  return (
    <div className="min-h-screen bg-gradient-dark p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/admin" className="text-gold-400 mb-4 inline-block">← Back to Dashboard</Link>
          <h1 className="text-4xl font-bold text-white">Business Analytics</h1>
          <p className="text-gray-400 mt-2">Track sales, revenue, and customer metrics</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="luxury-card p-6">
            <h3 className="text-gold-400 text-sm font-semibold mb-2">Total Sales</h3>
            <p className="text-4xl font-bold text-white">₹0</p>
            <p className="text-gray-400 text-sm mt-2">All time</p>
          </div>
          <div className="luxury-card p-6">
            <h3 className="text-gold-400 text-sm font-semibold mb-2">Total Orders</h3>
            <p className="text-4xl font-bold text-white">0</p>
            <p className="text-gray-400 text-sm mt-2">All time</p>
          </div>
          <div className="luxury-card p-6">
            <h3 className="text-gold-400 text-sm font-semibold mb-2">Avg Order Value</h3>
            <p className="text-4xl font-bold text-white">₹0</p>
            <p className="text-gray-400 text-sm mt-2">Average</p>
          </div>
          <div className="luxury-card p-6">
            <h3 className="text-gold-400 text-sm font-semibold mb-2">Customers</h3>
            <p className="text-4xl font-bold text-white">0</p>
            <p className="text-gray-400 text-sm mt-2">Unique</p>
          </div>
        </div>

        {/* Charts Placeholder */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="luxury-card p-8">
            <h2 className="text-xl font-bold text-white mb-6">Sales Trend</h2>
            <div className="h-64 bg-gray-900 rounded flex items-center justify-center text-gray-500">
              <p>Chart will display here</p>
            </div>
          </div>

          <div className="luxury-card p-8">
            <h2 className="text-xl font-bold text-white mb-6">Top Products</h2>
            <div className="h-64 bg-gray-900 rounded flex items-center justify-center text-gray-500">
              <p>Analytics coming soon</p>
            </div>
          </div>

          <div className="luxury-card p-8">
            <h2 className="text-xl font-bold text-white mb-6">Revenue by Collection</h2>
            <div className="h-64 bg-gray-900 rounded flex items-center justify-center text-gray-500">
              <p>Collection breakdown</p>
            </div>
          </div>

          <div className="luxury-card p-8">
            <h2 className="text-xl font-bold text-white mb-6">Customer Activity</h2>
            <div className="h-64 bg-gray-900 rounded flex items-center justify-center text-gray-500">
              <p>Recent activity</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
