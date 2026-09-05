'use client';

import Link from 'next/link';
import { calculateRetailPrice, formatPrice } from '@/lib/pricing';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    category: string;
    material: string;
    wholesalePrice: number;
    image?: string;
    stock: number;
    featured?: boolean;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const retailPrice = calculateRetailPrice(product.wholesalePrice);
  const isLowStock = product.stock < 10;

  return (
    <Link href={`/products/${product.id}`}>
      <div className="luxury-card group h-full flex flex-col overflow-hidden">
        {/* Premium Image Container - Photo Studio Style */}
        <div className="product-image-container aspect-square relative">
          {product.image ? (
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-800 to-black text-gold-600 text-6xl">
              ✨
            </div>
          )}

          {/* Luxury Overlay on Hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end">
            <div className="w-full p-6 text-white">
              <p className="text-sm uppercase tracking-widest font-semibold text-gold-400">
                View Collection
              </p>
            </div>
          </div>

          {/* Luxury Badges */}
          <div className="absolute top-6 left-6 space-y-3">
            {product.featured && (
              <div className="bg-black/60 backdrop-blur-sm border border-gold-500/50 text-gold-400 px-4 py-2 rounded-none text-xs uppercase font-bold tracking-widest">
                ⭐ Featured
              </div>
            )}
            {isLowStock && (
              <div className="bg-red-900/60 backdrop-blur-sm border border-red-500/50 text-red-300 px-4 py-2 rounded-none text-xs uppercase font-bold tracking-widest">
                ⚠ Limited
              </div>
            )}
          </div>

          {/* Stock Indicator Bottom Right */}
          <div className="absolute bottom-6 right-6">
            <div className={`px-4 py-2 rounded-none backdrop-blur-sm border text-xs uppercase font-bold tracking-widest ${
              product.stock > 0
                ? 'bg-green-900/60 border-green-500/50 text-green-300'
                : 'bg-red-900/60 border-red-500/50 text-red-300'
            }`}>
              {product.stock > 0 ? `${product.stock} In Stock` : 'Sold Out'}
            </div>
          </div>
        </div>

        {/* Luxury Content Section */}
        <div className="p-8 flex flex-col flex-grow bg-gradient-to-b from-gray-900 to-black">
          {/* Category - Elegant */}
          <p className="text-xs text-gold-400 uppercase tracking-widest font-semibold mb-3 opacity-80">
            {product.category.split(' - ')[0]}
          </p>

          {/* Product Name - Luxury Typography */}
          <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-gold-400 transition-colors duration-300 font-serif">
            {product.name}
          </h3>

          {/* Material - Subtle */}
          <p className="text-sm text-gray-400 mb-6 font-light">
            {product.material}
          </p>

          {/* Luxury Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-gold-600/30 to-transparent mb-6"></div>

          {/* Pricing Section - Premium Style */}
          <div className="mt-auto space-y-4">
            {/* Price Display */}
            <div>
              <p className="text-xs text-gray-500 uppercase tracking-wider font-light mb-2">
                Luxury Price
              </p>
              <p className="price-display text-3xl mb-1">
                {formatPrice(retailPrice)}
              </p>
              <p className="text-xs text-gray-500 font-light">
                with 50% markup + 5% GST
              </p>
            </div>

            {/* CTA Button - Luxury Style */}
            <button
              onClick={(e) => {
                e.preventDefault();
              }}
              disabled={product.stock === 0}
              className={`w-full py-4 mt-6 uppercase tracking-widest font-bold text-sm rounded-none transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed ${
                product.stock > 0
                  ? 'bg-gradient-to-r from-gold-600 to-gold-500 text-black hover:from-gold-500 hover:to-gold-400 shadow-lg hover:shadow-gold-500/50'
                  : 'bg-gray-700 text-gray-400'
              }`}
            >
              {product.stock > 0 ? '✨ View & Shop' : 'Unavailable'}
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
