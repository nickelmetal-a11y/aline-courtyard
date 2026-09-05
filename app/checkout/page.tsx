'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { calculateCartTotal, CartItem as CartItemType, formatPrice } from '@/lib/pricing';
import PricingBreakdown from '@/components/Checkout/PricingBreakdown';

interface CartProduct extends CartItemType {
  name: string;
  image?: string;
  color?: string;
}

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  streetAddress: string;
  city: string;
  state: string;
  pincode: string;
  sameAsBilling: boolean;
  billingStreet?: string;
  billingCity?: string;
  billingState?: string;
  billingPincode?: string;
}

export default function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    streetAddress: '',
    city: '',
    state: '',
    pincode: '',
    sameAsBilling: true,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  // Load cart
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
  }, []);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Checkout</h1>
          <div className="bg-white rounded-lg p-12 max-w-md mx-auto">
            <p className="text-gray-600 text-lg mb-8">Your cart is empty</p>
            <Link href="/products" className="btn-primary inline-block">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const cartTotal = calculateCartTotal(cartItems);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Valid 10-digit phone number is required';
    }
    if (!formData.streetAddress.trim()) newErrors.streetAddress = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.state.trim()) newErrors.state = 'State is required';
    if (!formData.pincode.trim()) newErrors.pincode = 'Pincode is required';
    if (!/^\d{6}$/.test(formData.pincode)) newErrors.pincode = 'Valid 6-digit pincode is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsProcessing(true);

    try {
      // Simulate order placement
      // In production, this would call your Razorpay API
      const orderData = {
        customer: {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: formData.phone,
        },
        shippingAddress: {
          street: formData.streetAddress,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode,
        },
        billingAddress: formData.sameAsBilling
          ? {
              street: formData.streetAddress,
              city: formData.city,
              state: formData.state,
              pincode: formData.pincode,
            }
          : {
              street: formData.billingStreet || '',
              city: formData.billingCity || '',
              state: formData.billingState || '',
              pincode: formData.billingPincode || '',
            },
        items: cartItems,
        totals: cartTotal,
      };

      console.log('Order Data:', orderData);

      // Simulate success
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Clear cart and show success
      localStorage.removeItem('cart');
      setOrderPlaced(true);

      // Redirect after 2 seconds
      setTimeout(() => {
        window.location.href = '/order-success';
      }, 2000);
    } catch (error) {
      console.error('Order placement failed:', error);
      setErrors({ submit: 'Failed to place order. Please try again.' });
    } finally {
      setIsProcessing(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-6xl mb-4">✓</p>
          <p className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</p>
          <p className="text-gray-600">Redirecting you...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="section-container">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Checkout Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Customer Info */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Contact Information</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      First Name *
                    </label>
                    <input
                      type="text"
                      value={formData.firstName}
                      onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
                    />
                    {errors.firstName && <p className="text-red-600 text-xs mt-1">{errors.firstName}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      value={formData.lastName}
                      onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
                    />
                    {errors.lastName && <p className="text-red-600 text-xs mt-1">{errors.lastName}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
                    />
                    {errors.email && <p className="text-red-600 text-xs mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
                    />
                    {errors.phone && <p className="text-red-600 text-xs mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Shipping Address */}
              <div className="bg-white rounded-lg p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Shipping Address</h2>

                <div className="mb-4">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    value={formData.streetAddress}
                    onChange={(e) => setFormData({ ...formData, streetAddress: e.target.value })}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
                  />
                  {errors.streetAddress && <p className="text-red-600 text-xs mt-1">{errors.streetAddress}</p>}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      City *
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
                    />
                    {errors.city && <p className="text-red-600 text-xs mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      State *
                    </label>
                    <input
                      type="text"
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
                    />
                    {errors.state && <p className="text-red-600 text-xs mt-1">{errors.state}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Pincode *
                    </label>
                    <input
                      type="text"
                      value={formData.pincode}
                      onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
                    />
                    {errors.pincode && <p className="text-red-600 text-xs mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              </div>

              {/* Billing Address */}
              <div className="bg-white rounded-lg p-6">
                <div className="flex items-center gap-2 mb-6">
                  <input
                    type="checkbox"
                    id="sameAsBilling"
                    checked={formData.sameAsBilling}
                    onChange={(e) => setFormData({ ...formData, sameAsBilling: e.target.checked })}
                    className="w-4 h-4"
                  />
                  <label htmlFor="sameAsBilling" className="text-sm font-semibold text-gray-700">
                    Billing address same as shipping
                  </label>
                </div>

                {!formData.sameAsBilling && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Street Address *
                      </label>
                      <input
                        type="text"
                        value={formData.billingStreet || ''}
                        onChange={(e) => setFormData({ ...formData, billingStreet: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="City"
                        value={formData.billingCity || ''}
                        onChange={(e) => setFormData({ ...formData, billingCity: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
                      />
                      <input
                        type="text"
                        placeholder="State"
                        value={formData.billingState || ''}
                        onChange={(e) => setFormData({ ...formData, billingState: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
                      />
                      <input
                        type="text"
                        placeholder="Pincode"
                        value={formData.billingPincode || ''}
                        onChange={(e) => setFormData({ ...formData, billingPincode: e.target.value })}
                        className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gold-600"
                      />
                    </div>
                  </div>
                )}
              </div>

              {/* Error Message */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 p-4 rounded-lg text-red-700">
                  {errors.submit}
                </div>
              )}

              {/* Place Order Button */}
              <button
                type="submit"
                disabled={isProcessing}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4"
              >
                {isProcessing ? 'Processing...' : '🔒 Place Order & Pay with Razorpay'}
              </button>

              {/* Back to Cart */}
              <Link href="/cart" className="btn-secondary w-full block text-center">
                Back to Cart
              </Link>
            </form>
          </div>

          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg p-6 sticky top-20 mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Cart Items */}
              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                {cartItems.map((item, index) => (
                  <div key={index} className="flex justify-between items-start">
                    <div className="flex-grow">
                      <p className="text-sm font-semibold text-gray-900">
                        {cartItems[index]?.name || 'Product'}
                      </p>
                      <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-gray-900">
                      {formatPrice(item.wholesalePrice * 1.5 * 1.05 * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Pricing */}
              <PricingBreakdown
                subtotal={cartTotal.subtotal}
                shipping={cartTotal.shipping}
                total={cartTotal.total}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
