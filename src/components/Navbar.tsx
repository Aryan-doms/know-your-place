'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { useCart } from './CartProvider';

import { usePathname } from 'next/navigation';

export default function Navbar() {
  const { items, setIsCartOpen } = useCart();
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (pathname === '/') return null;

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <header className="fixed top-0 w-full z-40 px-6 py-4 flex justify-between items-center pointer-events-none">
      {/* Top Left Logo? Or Center? The screenshot shows Logo on top left for checkout, but center for product page */}
      <div className="flex-1 pointer-events-auto flex items-start">
        {/* We can leave this empty if logo is centered */}
      </div>

      {/* Center Logo */}
      <div className="flex-1 text-center pointer-events-auto">
        <Link href="/" className="kyd-logo-font text-3xl tracking-tighter hover:opacity-70 transition-opacity">
          Know Your Place
        </Link>
      </div>

      {/* Right side cart */}
      <div className="flex-1 flex justify-end pointer-events-auto">
        <button
          onClick={() => setIsCartOpen(true)}
          className="relative p-2 hover:opacity-70 transition-opacity"
          aria-label="Open cart"
        >
          <ShoppingBag className="w-6 h-6 stroke-[1.5]" />
          {mounted && totalItems > 0 && (
            <span className="absolute top-0 right-0 bg-black text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
              {totalItems}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
