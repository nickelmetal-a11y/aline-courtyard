'use client';

import { formatPrice } from '@/lib/pricing';

interface PricingBreakdownProps {
  subtotal: number;
  shipping: number;
  total: number;
  freeShippingAt?: number;
  includeBreakdown?: boolean;
}

export default function PricingBreakdown({
  subtotal,
  shipping,
  total,
  freeShippingAt = 3000,
  includeBreakdown = true,
}: PricingBreakdownProps) {
  const amountNeededForFreeShipping = Math.max(0, freeShippingAt - subtotal);
  const isFreeShipping = shipping === 0;

  return (
    <div className="space-y-4">
      {/* Subtotal */}
      <div className="flex justify-between items-center">
        <span className="text-gray-600">Subtotal (with 50% markup + 5% GST)</span>
        <span className="font-semibold text-gray-900">{formatPrice(subtotal)}</span>
      </div>

      {/* Shipping */}
      <div className="pb-4 border-b border-gray-200">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gray-600">Shipping</span>
          <span className={`font-semibold ${isFreeShipping ? 'text-green-600' : 'text-gray-900'}`}>
            {isFreeShipping ? 'FREE' : formatPrice(shipping)}
          </span>
        </div>

        {/* Free Shipping Message */}
        {amountNeededForFreeShipping > 0 ? (
          <div className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
            💡 Add {formatPrice(amountNeededForFreeShipping)} more for free shipping!
          </div>
        ) : (
          <div className="text-xs text-green-600 bg-green-50 p-2 rounded">
            ✓ You qualify for free shipping!
          </div>
        )}
      </div>

      {/* Total */}
      <div className="flex justify-between items-center pt-4">
        <span className="text-lg font-bold text-gray-900">Total</span>
        <span className="text-2xl font-bold text-gold-600">{formatPrice(total)}</span>
      </div>

      {/* Pricing Info */}
      {includeBreakdown && (
        <div className="mt-6 pt-6 border-t border-gray-200 text-xs text-gray-500 space-y-1">
          <p>Retail prices include:</p>
          <p>• 50% markup on wholesale cost</p>
          <p>• 5% GST (tax)</p>
          <p>• Transparent pricing with no hidden fees</p>
        </div>
      )}
    </div>
  );
}
