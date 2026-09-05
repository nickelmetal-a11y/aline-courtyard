import Link from 'next/link';
import productData from '@/data/products.json';
import ProductCard from '@/components/ProductCard';

export default function Home() {
  const featuredProducts = productData.products.filter(p => p.featured).slice(0, 8);

  return (
    <>
      {/* Hero Section - Luxury Photo Studio */}
      <section className="gradient-dark relative overflow-hidden min-h-screen flex items-center justify-center py-20">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="section-container text-center relative z-10">
          <div className="mb-8">
            <p className="text-gold-400 uppercase tracking-widest text-sm font-semibold mb-6">
              ✨ Handcrafted Excellence
            </p>
            <h1 className="luxury-heading text-6xl md:text-7xl xl:text-8xl mb-8 leading-tight">
              Elevated
              <br />
              Gifting
              <br />
              Artistry
            </h1>
          </div>

          <p className="luxury-subheading max-w-3xl mx-auto mb-12 text-xl md:text-2xl">
            Museum-quality brass, ceramic, and marble collections for those who appreciate refined design and timeless craftsmanship.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/products" className="btn-primary">
              Explore Collection
            </Link>
            <button className="btn-secondary">
              View Catalog
            </button>
          </div>

          {/* Scroll Indicator */}
          <div className="mt-20 animate-bounce">
            <svg className="w-6 h-6 text-gold-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="gold-line"></div>

      {/* Collections Showcase - Luxury Grid */}
      <section className="gradient-dark py-24">
        <div className="section-container">
          <div className="text-center mb-20">
            <p className="text-gold-400 uppercase tracking-widest text-sm font-semibold mb-4">
              Our Collections
            </p>
            <h2 className="luxury-heading text-5xl md:text-6xl mb-6">
              Curated Excellence
            </h2>
            <p className="luxury-subheading text-lg max-w-2xl mx-auto">
              Each collection represents a distinct artistic vision, crafted with meticulous attention to detail.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Festive */}
            <Link href="/products?category=festive" className="luxury-card p-8 text-center group cursor-pointer">
              <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-300">
                🎉
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                Festive Collections
              </h3>
              <p className="text-gray-400 mb-6 font-light">
                Vibrant diyas, incense holders, and decorative pieces for celebrations and sacred moments.
              </p>
              <div className="text-gold-400 font-semibold uppercase text-xs tracking-widest group-hover:text-gold-300 transition-colors">
                Explore →
              </div>
            </Link>

            {/* Spiritual */}
            <Link href="/products?category=spiritual" className="luxury-card p-8 text-center group cursor-pointer">
              <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-300">
                🙏
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                Spiritual Sets
              </h3>
              <p className="text-gray-400 mb-6 font-light">
                Sacred puja sets, marble temples, and ritual pieces for daily worship and meditation.
              </p>
              <div className="text-gold-400 font-semibold uppercase text-xs tracking-widest group-hover:text-gold-300 transition-colors">
                Explore →
              </div>
            </Link>

            {/* Gift Combos */}
            <Link href="/products?category=gifts" className="luxury-card p-8 text-center group cursor-pointer">
              <div className="text-6xl mb-6 group-hover:scale-125 transition-transform duration-300">
                🎁
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-gold-400 transition-colors">
                Premium Gift Sets
              </h3>
              <p className="text-gray-400 mb-6 font-light">
                Beautifully curated and packaged collections for corporate gifting and special moments.
              </p>
              <div className="text-gold-400 font-semibold uppercase text-xs tracking-widest group-hover:text-gold-300 transition-colors">
                Explore →
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="gold-line"></div>

      {/* Featured Products - Gallery Style */}
      <section className="gradient-dark py-24">
        <div className="section-container">
          <div className="text-center mb-20">
            <p className="text-gold-400 uppercase tracking-widest text-sm font-semibold mb-4">
              Studio Favorites
            </p>
            <h2 className="luxury-heading text-5xl md:text-6xl">
              Featured Masterpieces
            </h2>
          </div>

          <div className="product-grid">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-16">
            <Link href="/products" className="btn-primary">
              Browse Full Collection
            </Link>
          </div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="gold-line"></div>

      {/* Why Aline Courtyard - Luxury Benefits */}
      <section className="gradient-dark py-24">
        <div className="section-container">
          <div className="text-center mb-20">
            <p className="text-gold-400 uppercase tracking-widest text-sm font-semibold mb-4">
              Why Choose Us
            </p>
            <h2 className="luxury-heading text-5xl md:text-6xl">
              Uncompromising Quality
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="luxury-card p-8 text-center">
              <div className="text-5xl mb-6">🎨</div>
              <h3 className="text-xl font-bold text-white mb-3">Artisan Crafted</h3>
              <p className="text-gray-400 font-light">
                Each piece handcrafted by master artisans with decades of expertise and dedication.
              </p>
            </div>

            <div className="luxury-card p-8 text-center">
              <div className="text-5xl mb-6">💎</div>
              <h3 className="text-xl font-bold text-white mb-3">Premium Materials</h3>
              <p className="text-gray-400 font-light">
                Pure brass, marble, ceramics, and stone sourced for superior quality and durability.
              </p>
            </div>

            <div className="luxury-card p-8 text-center">
              <div className="text-5xl mb-6">🌍</div>
              <h3 className="text-xl font-bold text-white mb-3">Free Shipping</h3>
              <p className="text-gray-400 font-light">
                Complimentary delivery on orders over ₹3000. Secure packaging for safe arrival.
              </p>
            </div>

            <div className="luxury-card p-8 text-center">
              <div className="text-5xl mb-6">✨</div>
              <h3 className="text-xl font-bold text-white mb-3">Concierge Support</h3>
              <p className="text-gray-400 font-light">
                Dedicated customer care available 24/7 with hassle-free returns and exchanges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gold Divider */}
      <div className="gold-line"></div>

      {/* CTA - Luxury Call to Action */}
      <section className="gradient-luxury relative overflow-hidden py-24">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gold-600 rounded-full blur-3xl"></div>
        </div>

        <div className="section-container text-center relative z-10">
          <h2 className="luxury-heading text-5xl md:text-6xl mb-6">
            Begin Your Journey
          </h2>
          <p className="luxury-subheading text-xl mb-12">
            Discover the intersection of timeless design and exceptional craftsmanship.
          </p>
          <Link href="/products" className="btn-primary inline-block">
            Start Exploring
          </Link>
        </div>
      </section>
    </>
  );
}
