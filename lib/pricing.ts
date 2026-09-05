/**
 * Pricing utilities for Aline Courtyard B2C
 * Handles retail price calculation with 50% markup and 5% GST
 * Calculates shipping: Free for orders ≥ ₹3000, else ₹100
 */

const MARKUP_PERCENTAGE = 0.50; // 50% markup
const TAX_RATE = 0.05; // 5% GST
const FREE_SHIPPING_THRESHOLD = 3000; // ₹3000
const SHIPPING_COST = 100; // ₹100

/**
 * Calculate retail price from wholesale price
 * Formula: (Wholesale Price × 1.50) × 1.05
 * @param wholesalePrice - Price from supplier (OFFER PRICE in PDFs)
 * @returns Retail price including markup and tax
 */
export function calculateRetailPrice(wholesalePrice: number): number {
  const withMarkup = wholesalePrice * (1 + MARKUP_PERCENTAGE);
  const withTax = withMarkup * (1 + TAX_RATE);
  return Math.round(withTax * 100) / 100; // Round to 2 decimals
}

/**
 * Calculate shipping cost based on order subtotal
 * @param subtotal - Total of all products (before shipping)
 * @returns Shipping cost (0 if ≥ ₹3000, else ₹100)
 */
export function calculateShipping(subtotal: number): number {
  return subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST;
}

/**
 * Calculate cart total
 * @param cartItems - Array of items in cart
 * @returns Object with breakdown and total
 */
export interface CartItem {
  id: string;
  wholesalePrice: number;
  quantity: number;
}

export interface CartTotal {
  subtotal: number;
  shipping: number;
  total: number;
  breakdown: {
    itemsPrice: number;
    markupAmount: number;
    taxAmount: number;
    shippingCost: number;
  };
}

export function calculateCartTotal(items: CartItem[]): CartTotal {
  // Calculate subtotal with retail prices
  let subtotal = 0;
  let originalPrice = 0;

  items.forEach((item) => {
    const retailPrice = calculateRetailPrice(item.wholesalePrice);
    subtotal += retailPrice * item.quantity;
    originalPrice += item.wholesalePrice * item.quantity;
  });

  // Calculate markup and tax amounts
  const markupAmount = Math.round((originalPrice * MARKUP_PERCENTAGE) * 100) / 100;
  const taxAmount = Math.round((originalPrice * (1 + MARKUP_PERCENTAGE) * TAX_RATE) * 100) / 100;

  // Calculate shipping
  const shipping = calculateShipping(subtotal);

  // Calculate final total
  const total = Math.round((subtotal + shipping) * 100) / 100;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    shipping,
    total,
    breakdown: {
      itemsPrice: Math.round(originalPrice * 100) / 100,
      markupAmount,
      taxAmount,
      shippingCost: shipping,
    },
  };
}

/**
 * Get pricing breakdown for display
 * Shows customer what they're paying and why
 */
export function getPricingBreakdown(items: CartItem[]) {
  const cart = calculateCartTotal(items);
  return {
    subtotal: cart.subtotal,
    shipping: cart.shipping,
    total: cart.total,
    freeShippingAt: FREE_SHIPPING_THRESHOLD,
    isFreeShipping: cart.shipping === 0,
    amountNeededForFreeShipping: Math.max(0, FREE_SHIPPING_THRESHOLD - cart.subtotal),
  };
}

/**
 * Format price in Indian Rupees
 */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
}
