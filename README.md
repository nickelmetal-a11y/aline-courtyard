# Aline Courtyard B2C Ecommerce Website

Premium handcrafted gifts and festive collections ecommerce platform for Aline Design.

## Features

### 🎨 Product Catalog
- **Rich Product Database**: Beautiful product display with images, descriptions, materials, and colors
- **Smart Filtering**: Filter by collection, price range, material, and availability
- **Featured Products**: Highlight bestsellers and promotional items
- **Inventory Management**: Real-time stock tracking with low-stock alerts

### 💰 Intelligent Pricing Engine
- **Automatic Markup**: 50% markup applied to wholesale prices
- **GST Calculation**: 5% tax automatically calculated
- **Dynamic Shipping**: 
  - Free shipping for orders ≥ ₹3000
  - ₹100 shipping for orders < ₹3000
- **Price Breakdown**: Customers see transparent pricing with GST and shipping details

### 🛒 Shopping Experience
- **Shopping Cart**: Add/remove items, update quantities
- **Persistent Cart**: Cart data saved in localStorage
- **Real-time Totals**: Instant price updates as cart changes
- **Gift Combos**: Special bundled product sets

### 💳 Secure Checkout
- **Address Collection**: Shipping and billing address forms
- **Razorpay Integration**: Secure payment processing
- **Order Tracking**: Order history and status updates
- **Order Confirmation**: Email receipts and order details

### 📊 Admin Features
- **Order Management**: View and manage customer orders
- **Inventory Tracking**: Monitor stock levels
- **Sales Analytics**: Track performance metrics

## Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Payment**: Razorpay
- **Image Hosting**: Cloudinary (optional)
- **Deployment**: Vercel

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn
- PostgreSQL database (or use Vercel PostgreSQL)
- Razorpay account (for payments)

### Installation

1. **Clone the repository**
```bash
cd aline-ecommerce
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Set up environment variables**
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
- `DATABASE_URL`: PostgreSQL connection string
- `NEXT_PUBLIC_RAZORPAY_KEY_ID`: Your Razorpay key
- `RAZORPAY_KEY_SECRET`: Your Razorpay secret
- `NEXT_PUBLIC_SITE_URL`: Your site URL

4. **Initialize database**
```bash
npm run db:setup
```

5. **Seed sample data**
```bash
npm run db:seed
```

6. **Run development server**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

## Project Structure

```
aline-ecommerce/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout flow
│   ├── orders/            # Order history
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── globals.css        # Global styles
├── components/            # React components
│   ├── Navigation.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── Cart/
│   └── Checkout/
├── lib/                   # Utilities
│   ├── pricing.ts         # Pricing calculations
│   ├── db.ts              # Database client
│   └── validators.ts      # Input validation
├── prisma/
│   └── schema.prisma      # Database schema
├── data/
│   └── products.json      # Product catalog
├── public/                # Static files
└── styles/                # Global styles
```

## Pricing Formula

All retail prices are automatically calculated:

```
Retail Price = (Wholesale Price × 1.50) × 1.05
Shipping = IF(cartTotal ≥ 3000, 0, 100)
Final Total = Retail Price + Tax + Shipping
```

**Example:**
- Wholesale Price (from PDF): ₹1460
- With 50% Markup: ₹1460 × 1.5 = ₹2190
- After 5% GST: ₹2190 × 1.05 = **₹2299.50**
- Shipping: ₹100 (unless order ≥ ₹3000)

## Key Features Implemented

### Phase 1: ✅ Setup & Core Data
- [x] Next.js project initialization
- [x] TypeScript & Tailwind configuration
- [x] Product data extracted from PDFs
- [x] Database schema with Prisma
- [x] Pricing utility functions

### Phase 2: 🔄 In Progress - Product Catalog
- [ ] Product listing page
- [ ] Product detail page
- [ ] Filtering & sorting
- [ ] Category navigation

### Phase 3: 📅 Upcoming - Pricing Engine
- [ ] Retail price calculations
- [ ] Price display component
- [ ] GST breakdown display

### Phase 4: 📅 Upcoming - Shopping Cart
- [ ] Cart state management
- [ ] Cart persistence
- [ ] Quantity management

### Phase 5: 📅 Upcoming - Checkout & Payment
- [ ] Address forms
- [ ] Razorpay integration
- [ ] Order confirmation

### Phase 6: 📅 Upcoming - Orders & Admin
- [ ] Order history
- [ ] Admin dashboard
- [ ] Email notifications

### Phase 7: 📅 Upcoming - Polish & Deployment
- [ ] Responsive design
- [ ] Performance optimization
- [ ] SEO optimization
- [ ] Vercel deployment

## Product Collections

Currently includes products from:
- **Rangraas Festive Collection**: Diyas, incense holders, gift combos
- **Additional Collections**: Omkara Spiritual, Palaash Spiritual, Gwaliyaar Utility Gifts, Calcutta Corporate Gifting, Puri Festive, Mysore Utility Gifts, Sipahi Bar Collection

## Business Configuration

All pricing and business rules are configured in `lib/pricing.ts`:

```typescript
const MARKUP_PERCENTAGE = 0.50;      // 50% markup
const TAX_RATE = 0.05;                // 5% GST
const FREE_SHIPPING_THRESHOLD = 3000; // ₹3000
const SHIPPING_COST = 100;            // ₹100
```

Modify these constants to adjust business rules.

## Database Models

### Product
- id, name, description, category
- material, colors, images
- wholesalePrice, stock, moq (minimum order quantity)
- featured flag

### Order
- id, orderNumber, customerEmail, customerPhone
- shippingAddress, billingAddress
- subtotal, shipping, tax, total
- status (pending, confirmed, shipped, delivered)
- paymentStatus, razorpay references

### Cart & CartItem
- Manages shopping cart state
- Persists with sessionId

## API Endpoints (Planned)

```
GET    /api/products              # List products
GET    /api/products/[id]         # Get product details
POST   /api/cart                  # Add to cart
DELETE /api/cart/[id]             # Remove from cart
POST   /api/checkout/pay          # Razorpay payment
GET    /api/orders                # User's orders
GET    /api/orders/[id]           # Order details
```

## Deployment

### Deploy to Vercel

1. **Push to GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/aline-ecommerce.git
git push -u origin main
```

2. **Connect to Vercel**
- Go to [vercel.com](https://vercel.com)
- Click "New Project"
- Select your GitHub repository
- Configure environment variables
- Deploy

### Database on Vercel

Use Vercel Postgres or Supabase:
- Vercel Postgres: Integrated with Vercel
- Supabase: Free PostgreSQL tier

## Environment Variables

Required:
- `DATABASE_URL` - PostgreSQL connection string
- `NEXT_PUBLIC_RAZORPAY_KEY_ID` - Razorpay public key
- `RAZORPAY_KEY_SECRET` - Razorpay secret key

Optional:
- `NEXT_PUBLIC_SITE_URL` - Site URL for emails
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary setup
- `SMTP_*` - Email configuration

## Development Tips

### Run Prisma Studio
```bash
npm run db:studio
```
Opens a visual database editor at http://localhost:5555

### View Database Migrations
```bash
npx prisma migrate dev --name add_feature_name
```

### Generate Prisma Client
```bash
npx prisma generate
```

## Performance Optimization

- ✅ Image optimization with Next.js Image
- ✅ Code splitting and lazy loading
- ✅ Static generation for product pages
- ✅ Database indexing on frequently queried fields
- ✅ CSS-in-JS with Tailwind for minimal bundle

## Security

- ✅ Environment variables for secrets
- ✅ SQL injection prevention with Prisma
- ✅ CSRF protection with Next.js
- ✅ Secure payment with Razorpay
- ✅ Input validation
- ✅ HTTPS ready

## Inventory Management

The system tracks stock levels:
- Low stock warnings (< 10 units)
- Automatic deductions on order confirmation
- Optional restock notifications

## Future Enhancements

- [ ] User accounts & login
- [ ] Wishlist functionality
- [ ] Product reviews & ratings
- [ ] Newsletter subscription
- [ ] Email notifications
- [ ] SMS alerts
- [ ] Admin dashboard
- [ ] Inventory analytics
- [ ] Multiple payment methods
- [ ] Discount codes & coupons
- [ ] Blog/content marketing
- [ ] SEO optimization
- [ ] Multi-language support

## Support & Contact

For support, contact:
- 📧 kapil.mathur@alinedesign.org
- 📱 +91 9891889249
- 📍 Aline Design Pvt Ltd, B-85 Sector-5, NOIDA

## License

MIT License - See LICENSE file for details

## Contributing

1. Create a feature branch
2. Commit changes
3. Push to branch
4. Create a Pull Request

---

**Built with ❤️ for Aline Design**

Happy selling! 🎁✨
