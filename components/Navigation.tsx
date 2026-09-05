'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-black/90 backdrop-blur-md border-b border-gold-600/30">
      <div className="section-container">
        <div className="flex justify-between items-center h-20">
          {/* Logo - Luxury Branding */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="text-3xl font-black tracking-tighter">
              <span className="text-gold-500">ALINE</span>
              <span className="text-gray-400 text-2xl font-light ml-2">COURTYARD</span>
            </div>
          </Link>

          {/* Desktop Menu - Luxury Navigation */}
          <div className="hidden md:flex items-center gap-12">
            <Link
              href="/products"
              className="text-gray-300 hover:text-gold-400 transition-colors duration-300 uppercase tracking-widest text-xs font-semibold group"
            >
              <span className="relative">
                Collection
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
            <Link
              href="/about"
              className="text-gray-300 hover:text-gold-400 transition-colors duration-300 uppercase tracking-widest text-xs font-semibold group"
            >
              <span className="relative">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
            <Link
              href="/contact"
              className="text-gray-300 hover:text-gold-400 transition-colors duration-300 uppercase tracking-widest text-xs font-semibold group"
            >
              <span className="relative">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-500 group-hover:w-full transition-all duration-300"></span>
              </span>
            </Link>
          </div>

          {/* Cart & Menu - Luxury Style */}
          <div className="flex items-center gap-6">
            <Link
              href="/cart"
              className="relative flex items-center gap-2 px-6 py-2 border border-gold-600/50 hover:border-gold-400 hover:bg-gold-600/10 transition-all duration-300 rounded-none group"
            >
              <span className="text-xl group-hover:scale-125 transition-transform">🛒</span>
              <span className="hidden sm:inline text-gray-300 uppercase text-xs font-semibold tracking-wider">Cart</span>
            </Link>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-gold-600/20 rounded-none border border-gold-600/30"
            >
              <span className="text-2xl text-gold-400">≡</span>
            </button>
          </div>
        </div>

        {/* Divider Line */}
        <div className="h-px bg-gradient-to-r from-transparent via-gold-600/50 to-transparent"></div>

        {/* Mobile Menu - Luxury Dropdown */}
        {isOpen && (
          <div className="md:hidden pb-6 pt-4 bg-gradient-to-b from-gold-600/10 to-transparent border-t border-gold-600/30 space-y-2">
            <Link
              href="/products"
              className="block py-3 px-4 text-gray-300 hover:text-gold-400 hover:bg-gold-600/10 transition-colors uppercase text-xs font-semibold tracking-wider"
            >
              Collection
            </Link>
            <Link
              href="/about"
              className="block py-3 px-4 text-gray-300 hover:text-gold-400 hover:bg-gold-600/10 transition-colors uppercase text-xs font-semibold tracking-wider"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="block py-3 px-4 text-gray-300 hover:text-gold-400 hover:bg-gold-600/10 transition-colors uppercase text-xs font-semibold tracking-wider"
            >
              Contact
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}
