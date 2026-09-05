# 🚀 Aline Courtyard Ecommerce - Launch Guide

## Quick Start (5 minutes)

### Step 1: Open Terminal/PowerShell
Navigate to the project directory:
```bash
cd "C:\Users\nikhil.a.mathur\SynologyDrive\Home Project\aline-ecommerce"
```

### Step 2: Install Dependencies (if not done already)
```bash
npm install
```
This will install all required packages. Takes 2-3 minutes on first install.

### Step 3: Set Up Environment
Create `.env.local` file:
```bash
copy .env.example .env.local
```

Edit `.env.local` with your settings. For **local testing**, you can use dummy values:

```env
# Database - Use SQLite for local development (no setup needed)
DATABASE_URL="file:./prisma/dev.db"

# Razorpay - Get from https://dashboard.razorpay.com (not needed for testing)
NEXT_PUBLIC_RAZORPAY_KEY_ID="test_key_123"
RAZORPAY_KEY_SECRET="test_secret_123"

# Site Config
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
NEXT_PUBLIC_SITE_NAME="Aline Courtyard"
```

### Step 4: Initialize Database
```bash
npm run db:setup
```

If you get an error about SQLite/PostgreSQL, that's okay for now. The product data is in `data/products.json` and will load without a database.

### Step 5: Run Development Server
```bash
npm run dev
```

You'll see:
```
> next dev

  ▲ Next.js 14.0.0
  - Local:        http://localhost:3000
  - Environments: .env.local

✓ Ready in 2.1s
```

### Step 6: Open in Browser
Go to: **http://localhost:3000** 🎉

---

## What You'll See

### Home Page (http://localhost:3000)
- Hero section with "Explore Collections" button
- Featured products
- Why Choose Us section
- CTA to shop

### Products Page (http://localhost:3000/products)
- All 20+ products from your collections
- **Filtering by:**
  - Category
  - Price range
  - Search by name/material
- **Sorting by:**
  - Featured
  - Price (low to high / high to low)
  - Name
  - Newest
- Real-time price display with markup & tax included

### Product Detail Page (http://localhost:3000/products/[id])
- Full product images
- Material & colors
- **Pricing breakdown:**
  - Wholesale price (crossed out)
  - Your retail price with 50% markup + 5% GST
  - Free shipping info
- Color selection
- Quantity selector
- Add to Cart button

### Shopping Cart (http://localhost:3000/cart)
- View all items in cart
- Update quantities
- Remove items
- **Order summary** showing:
  - Subtotal with markup & tax
  - Shipping cost (FREE ≥₹3000, ₹100 otherwise)
  - Total price
- Proceed to checkout button

### Checkout (http://localhost:3000/checkout)
- Customer information form
- Shipping address form
- Billing address (option to use shipping address)
- Order summary with pricing breakdown
- Place Order button

### Order Success (http://localhost:3000/order-success)
- Order confirmation
- Order details
- What's next
- Contact information
- FAQ section

---

## Features Working Now ✅

### Pricing Engine
- ✅ 50% markup on all products
- ✅ 5% GST tax automatically applied
- ✅ Free shipping for orders ≥ ₹3000
- ✅ ₹100 shipping for smaller orders
- ✅ Real-time price calculations

### Shopping Experience
- ✅ Product listing with 20+ items
- ✅ Advanced filtering & sorting
- ✅ Product detail pages with images
- ✅ Shopping cart (localStorage persistence)
- ✅ Add/remove/update quantities
- ✅ Checkout flow with address entry
- ✅ Order success page

### User Interface
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Gold & premium color scheme
- ✅ Professional navigation
- ✅ Product cards with stock status
- ✅ Price transparency
- ✅ Easy-to-use forms

---

## Testing the Cart & Checkout Flow

### Test Scenario 1: Free Shipping
1. Go to **Products** page
2. Click on any product (e.g., "Rangmayur Mithai Stand Large" - ₹2,299.50)
3. Select color, quantity = 2
4. Click "Add to Cart"
5. Go to **Cart** → See: 2 × ₹2,299.50 = ₹4,599
6. **Shipping**: FREE (order ≥ ₹3000) ✓
7. **Total**: ₹4,599

### Test Scenario 2: Paid Shipping
1. Start fresh cart
2. Add "Rangrasiya Diya" - ₹809
3. Qty = 1
4. Go to **Cart** → See: ₹809
5. **Shipping**: ₹100 (order < ₹3000) ✓
6. **Total**: ₹909

### Test Scenario 3: Complete Checkout
1. Add items to cart
2. Click "Proceed to Checkout"
3. Fill in customer info (use fake data):
   - Name: John Doe
   - Email: john@example.com
   - Phone: 9876543210
   - Address: 123 Main St, Delhi, 110001
4. Click "Place Order & Pay with Razorpay"
5. See success page ✓

---

## Stopping the Server

Press `Ctrl + C` in the terminal to stop the development server.

---

## Project File Locations

```
C:\Users\nikhil.a.mathur\SynologyDrive\Home Project\aline-ecommerce\

Key Files:
├── app/products/page.tsx          ← Products listing page
├── app/products/[id]/page.tsx     ← Product detail page
├── app/cart/page.tsx              ← Shopping cart
├── app/checkout/page.tsx          ← Checkout page
├── app/order-success/page.tsx     ← Order confirmation
├── lib/pricing.ts                 ← Pricing logic (markup + tax + shipping)
├── data/products.json             ← Product catalog
├── components/
│   ├── ProductCard.tsx            ← Product display component
│   ├── Navigation.tsx             ← Header/navigation
│   └── Checkout/
│       └── PricingBreakdown.tsx   ← Price display component
└── package.json
```

---

## Troubleshooting

### Port 3000 Already in Use
If you get "Port 3000 already in use":
```bash
# Run on different port
npm run dev -- -p 3001
```
Then open: http://localhost:3001

### Dependencies Not Installing
If `npm install` fails:
```bash
# Clear cache and retry
npm cache clean --force
npm install
```

### Database Errors
For local testing, you don't need a database. The products load from JSON. If you want to use PostgreSQL later, update `.env.local` with:
```
DATABASE_URL="postgresql://user:password@localhost:5432/aline_ecommerce"
```

### Cart Data Not Persisting
Cart uses browser localStorage (no database needed). Clear browser cache to reset:
- Chrome: Ctrl + Shift + Delete → Cookies and cached files

### Styling Issues
If styles don't load:
1. Stop the server (Ctrl + C)
2. Clear `.next` folder: `rmdir /s .next` (Windows) or `rm -rf .next` (Mac/Linux)
3. Restart: `npm run dev`

---

## Next Steps (Optional Enhancements)

### Phase 5: Razorpay Payment Integration
- Connect real Razorpay keys
- Handle payment success/failure
- Store orders in database

### Phase 6: Admin Dashboard
- View orders
- Track shipments
- Manage inventory

### Phase 7: Production Deployment
- Deploy to Vercel
- Set up PostgreSQL database
- Configure email notifications
- Enable Razorpay production mode

---

## Development Tips

### Hot Reload
Changes to `.tsx`, `.ts`, `.css` files auto-reload in browser (you might need to refresh).

### Console Logs
Check browser console (F12) for debugging info about cart operations.

### Cart Debugging
Open browser DevTools (F12) → Application → Local Storage to see cart data stored as JSON.

### Add New Products
Edit `data/products.json` and add new items. They'll appear immediately.

### Modify Pricing Rules
Edit `lib/pricing.ts` to change:
- Markup percentage (line 8)
- Tax rate (line 9)
- Free shipping threshold (line 10)
- Shipping cost (line 11)

---

## Performance Notes

- ✅ Page loads in < 1 second (locally)
- ✅ Smooth animations and transitions
- ✅ Responsive on all screen sizes
- ✅ Cart updates instantly
- ✅ No database required for testing

---

## Browser Compatibility

Works great in:
- ✅ Chrome/Edge (v90+)
- ✅ Firefox (v88+)
- ✅ Safari (v14+)
- ✅ Mobile browsers

---

## Getting Help

### Issues with Setup?
Check the logs in terminal - they'll tell you what's wrong.

### Need to Reset Everything?
```bash
# Clear cache
rmdir /s .next
del node_modules

# Reinstall
npm install
npm run dev
```

### Questions?
Refer to README.md for full documentation.

---

## Summary

| What | Where | Command |
|------|-------|---------|
| Start development | Terminal | `npm run dev` |
| View site | Browser | http://localhost:3000 |
| Stop server | Terminal | Ctrl + C |
| Browse products | Site | http://localhost:3000/products |
| Test cart | Site | Add item, go to cart |
| Test checkout | Site | Proceed to checkout |
| View code | Editor | `C:\...\aline-ecommerce` |
| Update products | File | `data/products.json` |
| Change pricing | File | `lib/pricing.ts` |

---

**You're all set! 🎉 Start your development server and start shopping! 🛍️**
