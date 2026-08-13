'use client';

import './globals.css';
import { CartProvider } from '@/components/CartProvider';
import CartDrawer from '@/components/CartDrawer';
import { usePathname } from 'next/navigation';

// Catalog and home manage their own headers
const PAGES_WITHOUT_NAVBAR = ['/', '/pages/catalog'];

import PasswordProtection from '@/components/PasswordProtection';

function LayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideNav = PAGES_WITHOUT_NAVBAR.includes(pathname);

  return (
    <PasswordProtection>
      <CartProvider>
        <main className={hideNav ? '' : 'min-h-screen pt-20'}>
          {children}
        </main>
        <CartDrawer />
      </CartProvider>
    </PasswordProtection>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>KNOW YOUR PLACE</title>
        <meta name="description" content="Know Your Place" />
      </head>
      <body>
        <LayoutShell>{children}</LayoutShell>
      </body>
    </html>
  );
}
