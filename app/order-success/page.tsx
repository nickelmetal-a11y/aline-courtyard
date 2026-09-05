'use client';

import Link from 'next/link';

export default function OrderSuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="section-container max-w-2xl mx-auto text-center">
        {/* Success Message */}
        <div className="bg-white rounded-lg shadow-lg p-12">
          <div className="text-6xl mb-6">✓</div>
          <h1 className="text-4xl font-bold text-green-600 mb-4">Order Placed Successfully!</h1>
          <p className="text-gray-600 text-lg mb-8">
            Thank you for your order. We've received your order and will process it shortly.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-bold text-gray-900 mb-4">Order Details</h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Order Number:</span>
                <span className="font-semibold text-gray-900">#ORDER-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Order Date:</span>
                <span className="font-semibold text-gray-900">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Expected Delivery:</span>
                <span className="font-semibold text-gray-900">5-7 Business Days</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-semibold text-green-600">Confirmed</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 rounded-lg p-6 mb-8 text-left">
            <h2 className="text-lg font-bold text-blue-900 mb-4">What's Next?</h2>
            <ul className="space-y-2 text-sm text-blue-800">
              <li>✓ We've sent a confirmation email to your registered email address</li>
              <li>✓ Your order is being prepared for shipment</li>
              <li>✓ You'll receive a tracking number via email once shipped</li>
              <li>✓ Track your order anytime from your account</li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="bg-gray-100 rounded-lg p-6 mb-8">
            <p className="text-sm text-gray-700 mb-3">Questions about your order?</p>
            <p className="text-sm text-gray-600 mb-2">
              📧 <a href="mailto:kapil.mathur@alinedesign.org" className="text-gold-600 hover:text-gold-700">
                kapil.mathur@alinedesign.org
              </a>
            </p>
            <p className="text-sm text-gray-600">
              📱 <a href="tel:+919891889249" className="text-gold-600 hover:text-gold-700">
                +91 9891889249
              </a>
            </p>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Link href="/products" className="btn-primary w-full block">
              Continue Shopping
            </Link>
            <Link href="/" className="btn-secondary w-full block">
              Back to Home
            </Link>
          </div>
        </div>

        {/* FAQ */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4 text-left">
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-bold text-gray-900 mb-2">How will I receive my order?</h3>
              <p className="text-sm text-gray-600">
                Your order will be shipped to the address you provided. You'll receive a tracking number via email.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-bold text-gray-900 mb-2">Can I modify my order?</h3>
              <p className="text-sm text-gray-600">
                Please contact us immediately at kapil.mathur@alinedesign.org if you need to make changes.
              </p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow">
              <h3 className="font-bold text-gray-900 mb-2">What's your return policy?</h3>
              <p className="text-sm text-gray-600">
                We offer 7-day returns for unused items. Items must be in original packaging. Shipping costs are non-refundable.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
