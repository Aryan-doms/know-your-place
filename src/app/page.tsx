'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

export default function Home() {
  const logoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const logoW = 460;
    const logoH = 220;

    let x = Math.random() * (window.innerWidth - logoW);
    let y = Math.random() * (window.innerHeight - logoH);
    let dx = 1.5;
    let dy = 1.2;
    let raf: number;

    const animate = () => {
      x += dx;
      y += dy;

      const maxX = window.innerWidth - logoW;
      const maxY = window.innerHeight - logoH;

      if (x <= 0) { x = 0; dx = Math.abs(dx); }
      if (x >= maxX) { x = maxX; dx = -Math.abs(dx); }
      if (y <= 0) { y = 0; dy = Math.abs(dy); }
      if (y >= maxY) { y = maxY; dy = -Math.abs(dy); }

      logo.style.transform = `translate(${x}px, ${y}px)`;
      raf = requestAnimationFrame(animate);
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        overflow: 'hidden',
        backgroundColor: '#b82e2e',
      }}
    >
      {/* Red bubble-wrap texture — same image as body but tinted red via the bg color behind */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: "url('/assets/lockscreen-texture.webp')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          mixBlendMode: 'multiply',
          opacity: 0.55,
          pointerEvents: 'none',
        }}
      />

      {/* DVD-bouncing KYD logo */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: 460,
          pointerEvents: 'none',
          zIndex: 10,
          willChange: 'transform',
        }}
      >
        <img
          src="/assets/lockscreen-logo.webp"
          alt="KYD Logo"
          style={{ width: '100%', height: 'auto', display: 'block' }}
        />
      </div>

      {/* ENTER THE VOID button — bottom center, exactly like the real site */}
      <div
        style={{
          position: 'absolute',
          bottom: 48,
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 20,
        }}
      >
        <Link href="/pages/catalog">
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px 24px',
              border: '3px solid #000',
              backgroundColor: '#efefef',
              boxShadow: '4px 4px 0 #000',
              cursor: 'pointer',
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#000',
              whiteSpace: 'nowrap',
            }}
          >
            ENTER THE VOID
          </div>
        </Link>
      </div>
    </div>
  );
}
