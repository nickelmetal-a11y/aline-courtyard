'use client';

import { useState } from 'react';
import Link from 'next/link';
import productData from '@/data/products.json';
import { calculateRetailPrice, formatPrice } from '@/lib/pricing';
import ProductCard from '@/components/ProductCard';

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const product = productData.products.find(p => p.id === params.id);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0] || '');
  const [addedToCart, setAddedToCart] = useState(false);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="section-container text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link href="/products" className="btn-primary inline-block">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const retailPrice = calculateRetailPrice(product.wholesalePrice);
  const relatedProducts = productData.products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  const handleAddToCart = () => {
    // Store cart item in localStorage
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: any) =>
      item.id === product.id && item.color === selectedColor
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        wholesalePrice: product.wholesalePrice,
        image: product.image,
        color: selectedColor,
        quantity,
      });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="section-container">
        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm">
          <Link href="/" className="text-gold-600 hover:text-gold-700">Home</Link>
          <span className="text-gray-400">/</span>
          <Link href="/products" className="text-gold-600 hover:text-gold-700">Products</Link>
          <span className="text-gray-400">/</span>
          <span className="text-gray-700">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image */}
          <div className="flex items-center justify-center bg-white rounded-lg p-8 sticky top-20 h-fit">
            {product.image ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto object-contain max-h-96"
                onError={(e) => {
                  e.currentTarget.innerHTML = '<div class="text-6xl text-gray-300">📦</div>';
                }}
              />
            ) : (
              <div className="text-6xl text-gray-300">📦</div>
            )}
          </div>

          {/* Product Details */}
          <div className="space-y-8">
            {/* Category & Title */}
            <div>
              <p className="text-xs uppercase tracking-wider text-gray-500 mb-2">
                {product.category}
              </p>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>
              <p className="text-gray-700 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Pricing */}
            <div className="bg-gold-50 p-6 rounded-lg">
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <p className="text-xs text-gray-600 uppercase">Wholesale Price</p>
                  <p className="text-lg text-gray-800 line-through">
                    ₹{product.wholesalePrice.toLocaleString('en-IN')}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-600 uppercase">Your Price</p>
                  <p className="price-display">
                    {formatPrice(retailPrice)}
                  </p>
                </div>
              </div>
              <div className="border-t border-gold-200 pt-4 text-sm text-gray-600">
                <p>✓ Includes 50% markup on wholesale price</p>
                <p>✓ Includes 5% GST tax</p>
                <p>✓ Free shipping on orders ≥ ₹3000</p>
              </div>
            </div>

            {/* Material & Colors */}
            <div>
              <p className="text-sm font-semibold text-gray-700 mb-2">Material</p>
              <p className="text-gray-800 bg-gray-100 px-4 py-2 rounded">
                {product.material}
              </p>
            </div>

            {/* Color Selection */}
            {product.colors && product.colors.length > 0 && (
              <div>
                <p className="text-sm font-semibold text-gray-700 mb-3">
                  Available Colors
                </p>
                <div className="flex gap-3 flex-wrap">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        selectedColor === color
                          ? 'bg-gold-600 text-white ring-2 ring-gold-400'
                          : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Stock Status */}
            <div>
              <p className={`text-sm font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {product.stock > 0 ? `✓ ${product.stock} in stock` : '✗ Out of stock'}
              </p>
              {product.moq && product.moq > 1 && (
                <p className="text-xs text-gray-600 mt-1">
                  Minimum Order Quantity: {product.moq}
                </p>
              )}
            </div>

            {/* Quantity & Add to Cart */}
            {product.stock > 0 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded font-bold"
                    >
                      −
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => setQuantity(Math.min(product.stock, parseInt(e.target.value) || 1))}
                      className="w-16 px-3 py-2 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gold-600"
                    />
                    <button
                      onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                      className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded font-bold"
                    >
                      +
                    </button>
                    <span className="text-sm text-gray-600">
                      ({product.stock} available)
                    </span>
                  </div>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={handleAddToCart}
                  className={`w-full py-4 rounded-lg font-bold text-white text-lg transition-all ${
                    addedToCart
                      ? 'bg-green-600'
                      : 'bg-gold-600 hover:bg-gold-700'
                  }`}
                >
                  {addedToCart ? '✓ Added to Cart!' : '🛒 Add to Cart'}
                </button>
              </div>
            )}

            {/* Continue Shopping */}
            <Link href="/products" className="btn-secondary block text-center">
              Continue Shopping
            </Link>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Related Products</h2>
            <div className="product-grid">
              {relatedProducts.map(relatedProduct => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}

        {/* Product Details Table */}
        <section className="mt-16 bg-white rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Product Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="py-3 font-semibold text-gray-700">Category</td>
                  <td className="py-3 text-gray-600">{product.category}</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-gray-700">Material</td>
                  <td className="py-3 text-gray-600">{product.material}</td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-gray-700">Available Colors</td>
                  <td className="py-3 text-gray-600">
                    {product.colors?.join(', ') || 'N/A'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-gray-700">Stock</td>
                  <td className={`py-3 font-semibold ${product.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {product.stock > 0 ? `${product.stock} items` : 'Out of stock'}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-gray-700">Wholesale Price</td>
                  <td className="py-3 text-gray-600">
                    ₹{product.wholesalePrice.toLocaleString('en-IN')}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-gray-700">Retail Price (Your Price)</td>
                  <td className="py-3 price-display">
                    {formatPrice(retailPrice)}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 font-semibold text-gray-700">Markup Applied</td>
                  <td className="py-3 text-gray-600">50% + 5% GST</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </div>
  );
}
