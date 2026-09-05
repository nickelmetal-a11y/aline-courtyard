'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Aline Courtyard</h3>
            <p className="text-sm">Premium handcrafted gifts and spiritual collections.</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Shop</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/products" className="hover:text-gold-500 transition">All Products</Link></li>
              <li><Link href="/products?category=festive" className="hover:text-gold-500 transition">Festive</Link></li>
              <li><Link href="/products?category=spiritual" className="hover:text-gold-500 transition">Spiritual</Link></li>
              <li><Link href="/products?category=gifts" className="hover:text-gold-500 transition">Gift Combos</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-gold-500 transition">About Us</Link></li>
              <li><Link href="/faq" className="hover:text-gold-500 transition">FAQ</Link></li>
              <li><Link href="/shipping" className="hover:text-gold-500 transition">Shipping Info</Link></li>
              <li><Link href="/returns" className="hover:text-gold-500 transition">Returns</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <p className="text-sm mb-2">
              📧 <a href="mailto:kapil.mathur@alinedesign.org" className="hover:text-gold-500 transition">
                kapil.mathur@alinedesign.org
              </a>
            </p>
            <p className="text-sm mb-2">
              📱 <a href="tel:+919891889249" className="hover:text-gold-500 transition">
                +91 9891889249
              </a>
            </p>
            <p className="text-sm">
              📍 Aline Design Pvt Ltd.<br />
              B-85, Sector -5, NOIDA<br />
              Uttar Pradesh 20130
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 Aline Courtyard. All rights reserved.
            </p>
            <div className="flex gap-4 mt-4 md:mt-0">
              <Link href="/privacy" className="text-sm hover:text-gold-500 transition">Privacy Policy</Link>
              <Link href="/terms" className="text-sm hover:text-gold-500 transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
