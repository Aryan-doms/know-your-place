'use client';

import React from 'react';
import { usePathname } from 'next/navigation';

export default function FloatingDiscount() {
  const pathname = usePathname();
  if (pathname === '/') return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 animate-bounce cursor-pointer hover:scale-105 transition-transform origin-bottom-left">
      <div className="bg-[#e50000] text-white font-bold uppercase py-2 px-4 border-2 border-black rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-sm rotate-[-5deg]">
        15% Off Your First Order!
      </div>
    </div>
  );
}
