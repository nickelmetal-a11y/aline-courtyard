export default function StatusPage() {
  const buildTime = new Date().toISOString();

  return (
    <div className="min-h-screen bg-gradient-dark flex items-center justify-center p-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div>
          <h1 className="text-4xl font-bold text-white mb-4">Deployment Status</h1>
          <p className="text-gold-400 text-lg mb-8">✓ Website is LIVE</p>
        </div>

        <div className="luxury-card p-8 space-y-4 text-left">
          <div>
            <p className="text-gray-400 text-sm">Last Build:</p>
            <p className="text-white font-mono text-sm">{buildTime}</p>
          </div>

          <div>
            <p className="text-gray-400 text-sm">Features:</p>
            <ul className="text-white text-sm space-y-1 mt-2">
              <li>✓ Product Catalog</li>
              <li>✓ Shopping Cart</li>
              <li>✓ Checkout Page</li>
              <li>✓ Razorpay Payments</li>
              <li>✓ Admin Dashboard</li>
              <li>✓ Product Images</li>
            </ul>
          </div>

          <div className="border-t border-gray-700 pt-4 mt-4">
            <p className="text-gray-400 text-sm mb-3">Quick Links:</p>
            <div className="space-y-2">
              <a href="/" className="block text-gold-400 hover:text-gold-300 text-sm">→ Home</a>
              <a href="/products" className="block text-gold-400 hover:text-gold-300 text-sm">→ Products</a>
              <a href="/cart" className="block text-gold-400 hover:text-gold-300 text-sm">→ Cart</a>
              <a href="/admin" className="block text-gold-400 hover:text-gold-300 text-sm">→ Admin</a>
            </div>
          </div>
        </div>

        <p className="text-gray-500 text-xs">
          If you don't see products with images, try:
          <br />
          1. Hard refresh (Ctrl+Shift+R)
          <br />
          2. Clear browser cache
          <br />
          3. Incognito mode
        </p>
      </div>
    </div>
  );
}
