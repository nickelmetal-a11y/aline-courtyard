'use client';

import Link from 'next/link';

interface Order {
  id: string;
  orderNumber: string;
  email: string;
  total: number;
  status: string;
  createdAt: string;
}

export default function OrdersAdmin() {
  const orders: Order[] = []; // Will be fetched from database

  return (
    <div className="min-h-screen bg-gradient-dark p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <Link href="/admin" className="text-gold-400 mb-4 inline-block">← Back to Dashboard</Link>
          <h1 className="text-4xl font-bold text-white">Orders Management</h1>
          <p className="text-gray-400 mt-2">View and manage all customer orders</p>
        </div>

        {orders.length === 0 ? (
          <div className="luxury-card p-12 text-center">
            <p className="text-gray-400 text-lg mb-4">No orders yet</p>
            <Link href="/products" className="btn-primary inline-block">
              Go to Store
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-white">
              <thead className="border-b border-gray-700">
                <tr>
                  <th className="text-left py-4 px-4">Order #</th>
                  <th className="text-left py-4 px-4">Customer</th>
                  <th className="text-left py-4 px-4">Amount</th>
                  <th className="text-left py-4 px-4">Status</th>
                  <th className="text-left py-4 px-4">Date</th>
                  <th className="text-left py-4 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.id} className="border-b border-gray-800 hover:bg-gray-900/50">
                    <td className="py-4 px-4 font-semibold">{order.orderNumber}</td>
                    <td className="py-4 px-4">{order.email}</td>
                    <td className="py-4 px-4 text-gold-400">₹{order.total.toFixed(2)}</td>
                    <td className="py-4 px-4">
                      <span className={`px-3 py-1 rounded text-sm ${
                        order.status === 'completed' ? 'bg-green-900 text-green-300' :
                        order.status === 'pending' ? 'bg-yellow-900 text-yellow-300' :
                        'bg-gray-700 text-gray-300'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-gray-400">{new Date(order.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4 space-x-2">
                      <button className="text-gold-400 hover:text-gold-300">View</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
