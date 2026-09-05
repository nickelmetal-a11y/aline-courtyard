import type { Metadata } from 'next';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Aline Courtyard - Handcrafted Gifts & Festive Collections',
  description: 'Premium handcrafted gifts, spiritual collections, and festive items from Aline Design. Shop unique brass, ceramic, and marble gift sets.',
  keywords: 'handcrafted gifts, festive gifts, diya, brass gifts, spiritual gifts, Indian handicrafts',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
