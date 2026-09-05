'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { calculateRetailPrice, calculateCartTotal, formatPrice, CartItem as CartItemType } from '@/lib/pricing';
import PricingBreakdown from '@/components/Checkout/PricingBreakdown';

interface CartProduct extends CartItemType {
  name: string;
  image?: string;
  color?: string;
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load cart from localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error('Failed to load cart:', error);
      }
    }
    setIsLoading(false);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isLoading]);

  const handleUpdateQuantity = (id: string, color: string | undefined, quantity: number) => {
    if (quantity < 1) return;
    setCartItems(cartItems.map(item =>
      item.id === id && item.color === color
        ? { ...item, quantity }
        : item
    ));
  };

  const handleRemoveItem = (id: string, color: string | undefined) => {
    setCartItems(cartItems.filter(item => !(item.id === id && item.color === color)));
  };

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      setCartItems([]);
      localStorage.removeItem('cart');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-16">
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Shopping Cart</h1>
          <div className="bg-white rounded-lg p-12 max-w-md mx-auto">
            <p className="text-6xl mb-4">🛒</p>
            <p className="text-gray-600 text-lg mb-8">Your cart is empty</p>
            <p className="text-gray-500 mb-8">
              Explore our handcrafted collection and add items to your cart.
            </p>
            <Link href="/products" className="btn-primary inline-block">
              Start Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Convert cart items to format needed for pricing calculations
  const cartTotal = calculateCartTotal(cartItems.map(item => ({
    id: item.id,
    wholesalePrice: item.wholesalePrice,
    quantity: item.quantity,
  })));

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="section-container">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Shopping Cart</h1>
          <p className="text-gray-600">
            {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Cart Items List */}
              {cartItems.map((item) => {
                const retailPrice = calculateRetailPrice(item.wholesalePrice);
                const itemTotal = retailPrice * item.quantity;

                return (
                  <div
                    key={`${item.id}-${item.color}`}
                    className="p-6 border-b border-gray-200 flex gap-6 hover:bg-gray-50 transition"
                  >
                    {/* Product Image */}
                    <div className="flex-shrink-0 w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                      ) : (
                        <div className="text-3xl">📦</div>
                      )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-grow">
                      <Link href={`/products/${item.id}`} className="hover:text-gold-600">
                        <h3 className="font-bold text-gray-900 text-lg mb-1">{item.name}</h3>
                      </Link>
                      {item.color && (
                        <p className="text-sm text-gray-600 mb-2">Color: {item.color}</p>
                      )}
                      <p className="text-gold-600 font-semibold">
                        {formatPrice(retailPrice)} each
                      </p>
                    </div>

                    {/* Quantity & Total */}
                    <div className="flex flex-col items-end gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.color, item.quantity - 1)}
                          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                        >
                          −
                        </button>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => handleUpdateQuantity(item.id, item.color, parseInt(e.target.value) || 1)}
                          className="w-12 px-2 py-1 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-600"
                        />
                        <button
                          onClick={() => handleUpdateQuantity(item.id, item.color, item.quantity + 1)}
                          className="bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                        >
                          +
                        </button>
                      </div>

                      {/* Item Total */}
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Subtotal</p>
                        <p className="text-xl font-bold text-gray-900">
                          {formatPrice(itemTotal)}
                        </p>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => handleRemoveItem(item.id, item.color)}
                        className="text-red-600 hover:text-red-700 text-sm font-semibold"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Cart Actions */}
              <div className="p-6 bg-gray-50 border-t border-gray-200 flex justify-between items-center">
                <Link href="/products" className="text-gold-600 hover:text-gold-700 font-semibold">
                  ← Continue Shopping
                </Link>
                <button
                  onClick={handleClearCart}
                  className="text-red-600 hover:text-red-700 font-semibold text-sm"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          </div>

          {/* Cart Summary Sidebar */}
          <div>
            <div className="bg-white rounded-lg shadow-md p-6 sticky top-20">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Pricing Breakdown Component */}
              <PricingBreakdown
                subtotal={cartTotal.subtotal}
                shipping={cartTotal.shipping}
                total={cartTotal.total}
                freeShippingAt={3000}
              />

              {/* Checkout Button */}
              <Link href="/checkout" className="btn-primary w-full block text-center mt-6 mb-3">
                Proceed to Checkout
              </Link>

              {/* Continue Shopping */}
              <Link href="/products" className="btn-secondary w-full block text-center">
                Continue Shopping
              </Link>

              {/* Shipping Info */}
              <div className="mt-6 pt-6 border-t border-gray-200 text-sm text-gray-600 space-y-2">
                <p>✓ Secure checkout with Razorpay</p>
                <p>✓ Free shipping on orders ≥ ₹3000</p>
                <p>✓ Easy returns & exchanges</p>
                <p>✓ 24/7 customer support</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
