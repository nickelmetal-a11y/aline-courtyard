# Aline Courtyard B2C Ecommerce - Complete Setup Guide

## ✅ WHAT'S BEEN BUILT

### Frontend (✓ Complete & Live)
- **Product Catalog** - Browse 20+ handcrafted products with filtering
- **Shopping Cart** - Add/remove items with real-time calculations  
- **Checkout Flow** - Full customer information form with address validation
- **Pricing Engine** - Automatic 50% markup + 5% GST + conditional shipping
- **Luxury Design** - Dark theme with gold accents, responsive mobile layout
- **Live at** - https://aline-courtyard.vercel.app

### Admin Dashboard (✓ New - Ready to Deploy)
- **Login Authentication** - Password-protected admin access
- **Products Management** - Add, edit, delete products in database
- **Orders Management** - View and track all customer orders
- **Inventory Tracking** - Monitor stock levels with low-stock alerts
- **Business Analytics** - Sales metrics, revenue, customer data
- **Access at** - https://aline-courtyard.vercel.app/admin

### Payment Integration (✓ Ready)
- **Razorpay API** - Complete payment order creation flow
- **Order Tracking** - Razorpay order IDs linked to customer orders
- **Ready for** - Live payment processing

### Database Schema (✓ Complete)
- Products, Orders, Cart Items, Categories, Users
- Optimized for ecommerce operations
- Ready for PostgreSQL deployment

---

## 🔧 SETUP REQUIREMENTS (One-Time Setup)

### 1. Database Setup (Choose One)

#### Option A: Vercel PostgreSQL (Recommended - Easy)
```bash
# Visit: https://vercel.com/docs/storage/vercel-postgres
# 1. Go to Vercel Dashboard
# 2. Select your aline-courtyard project
# 3. Go to Storage > Create > Postgres
# 4. Copy DATABASE_URL
# 5. Add to .env.local in the project
```

#### Option B: Supabase (Free Tier)
```bash
# Visit: https://supabase.com
# 1. Sign up and create new project
# 2. Go to Project Settings > Database
# 3. Copy Connection String (PostgreSQL)
# 4. Add to .env.local as DATABASE_URL
```

### 2. Razorpay Payment Setup (5 min)
```bash
# Visit: https://dashboard.razorpay.com/app/keys
# 1. Create account or login
# 2. Go to Settings > API Keys
# 3. Copy:
#    - Key ID → NEXT_PUBLIC_RAZORPAY_KEY_ID
#    - Key Secret → RAZORPAY_KEY_SECRET
# 4. Add to .env.local
```

### 3. Product Images (CRITICAL - Without this, products have no images)

**Option A: Cloudinary (Recommended)**
```bash
# Visit: https://cloudinary.com
# 1. Sign up free account
# 2. Get Cloud Name from Dashboard
# 3. Go to Settings > API Keys
# 4. Copy:
#    - Cloud Name → NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
#    - API Key → CLOUDINARY_API_KEY
#    - API Secret → CLOUDINARY_API_SECRET
# 5. Add to .env.local
```

**Option B: Manual Upload**
```bash
# 1. Extract product images from PDF catalogs
# 2. Upload to public/products/ folder in project
# 3. Update products.json with image URLs
# 4. Example: /products/rangmayur-mithai-stand.jpg
```

### 4. Email Notifications (Optional but Recommended)
```bash
# Visit: https://resend.com
# 1. Sign up free account (free tier: 100 emails/day)
# 2. Copy API Key
# 3. Add to .env.local as RESEND_API_KEY
# 4. Verify sender email
```

### 5. Admin Password Setup
```bash
# Edit .env.local:
ADMIN_PASSWORD="your_secure_password_here"
# Change this immediately after first login!
```

---

## 📋 STEP-BY-STEP DEPLOYMENT CHECKLIST

### Before Going Live

- [ ] Database configured and connected
- [ ] Razorpay account activated with test keys
- [ ] Product images uploaded (Cloudinary or local)
- [ ] Admin password set (change from default)
- [ ] Email service configured (optional)
- [ ] .env.local file filled with all keys
- [ ] Test checkout flow with Razorpay test card

### Test Cards for Razorpay
```
Card Number: 4111 1111 1111 1111
Expiry: Any future date
CVV: Any 3 digits
```

### Go Live
```bash
# 1. Switch to Razorpay LIVE keys (not test)
# 2. Update RAZORPAY_KEY_ID and RAZORPAY_KEY_SECRET
# 3. Update site URL to production domain
# 4. Push to GitHub
# 5. Vercel auto-deploys
```

---

## 🚀 ACCESSING YOUR SITE

### Customer Website
```
https://aline-courtyard.vercel.app
```

### Admin Dashboard
```
https://aline-courtyard.vercel.app/admin
Password: (set in .env.local)
```

### Admin Features Available
- Add/edit/delete products
- View all customer orders
- Track inventory and low stock alerts
- View business analytics dashboard

---

## 📊 CURRENT STATUS

| Feature | Status | Notes |
|---------|--------|-------|
| Product Catalog | ✅ Live | 20+ products from PDFs |
| Shopping Cart | ✅ Live | Full functionality |
| Checkout | ✅ Live | Ready for payments |
| Pricing Calc | ✅ Live | 50% markup + 5% GST |
| Luxury Design | ✅ Live | Dark theme, gold accents |
| Admin Dashboard | ✅ Ready | Needs DB configuration |
| Razorpay | ✅ Ready | Needs credentials |
| Database | ✅ Ready | Needs setup |
| Product Images | ⚠️ TODO | CRITICAL - Extract from PDFs |
| Email Notifications | ⏳ Future | Optional enhancement |
| User Accounts | ⏳ Future | Optional feature |
| Analytics Charts | ⏳ Future | Dashboard structure ready |

---

## 🎯 NEXT STEPS (In Order)

### Week 1: Essential Setup
1. Set up PostgreSQL database (Vercel or Supabase)
2. Configure Razorpay with live keys
3. Extract/upload product images
4. Set admin password
5. Test complete checkout flow

### Week 2: Launch
1. Switch to live Razorpay keys
2. Update site domain
3. Enable email notifications
4. Monitor first orders
5. Train on admin dashboard

### Week 3+: Enhancements
1. Add product reviews/ratings
2. Implement user accounts
3. Add wishlist feature
4. Create analytics reports
5. Set up automated backups

---

## 🛠️ TROUBLESHOOTING

### Products not showing images?
- Check Cloudinary/image hosting configured
- Verify image URLs in products.json

### Admin login not working?
- Check ADMIN_PASSWORD in .env.local
- Ensure .env.local file exists in project root

### Checkout button not working?
- Check Razorpay keys configured
- Verify DATABASE_URL is set

### Vercel deployment shows blank page?
- Check build logs in Vercel dashboard
- Ensure all env variables are set in Vercel project settings
- Clear browser cache and reload

---

## 📞 SUPPORT

### Important Links
- Next.js Docs: https://nextjs.org/docs
- Tailwind CSS: https://tailwindcss.com
- Prisma: https://www.prisma.io/docs
- Razorpay: https://razorpay.com/docs

### GitHub Repository
- https://github.com/nickelmetal-a11y/aline-courtyard

---

## 🔐 Security Notes

1. **Never commit .env.local** - Already in .gitignore
2. **Use strong admin password** - Change default immediately
3. **Use Razorpay live keys only when ready** - Test with sandbox first
4. **Enable HTTPS** - Vercel provides free SSL
5. **Keep dependencies updated** - Run `npm update` monthly

---

## 📱 RESPONSIVE DESIGN

The site is fully responsive on:
- Mobile (375px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

Test on different devices using browser dev tools!

---

## 🎨 Customization

### Change Brand Colors
Edit `tailwind.config.js` - Modify gold color values

### Change Logo/Text
Edit `components/Navigation.tsx` and `app/page.tsx`

### Change Pricing Formula
Edit `lib/pricing.ts` - Modify MARKUP_PERCENTAGE, TAX_RATE, SHIPPING_COST

### Change Email Templates
Create email templates using Resend (when email service is set up)

---

Generated on: September 2026
Last Updated: Now
