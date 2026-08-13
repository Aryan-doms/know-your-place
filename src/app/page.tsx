'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const logoRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const logo = logoRef.current;
    if (!logo) return;

    const mobile = window.innerWidth < 600;
    setIsMobile(mobile);

    const logoW = mobile ? Math.min(240, window.innerWidth * 0.65) : 460;
    const logoH = logoW * (220 / 460);
    logo.style.width = `${logoW}px`;

    let x = Math.random() * Math.max(10, window.innerWidth - logoW);
    let y = Math.random() * Math.max(10, window.innerHeight - logoH);
    let dx = mobile ? 1.0 : 1.5;
    let dy = mobile ? 0.8 : 1.2;
    let raf: number;

    const animate = () => {
      x += dx;
      y += dy;

      const maxX = Math.max(1, window.innerWidth - logoW);
      const maxY = Math.max(1, window.innerHeight - logoH);

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
      {/* Red bubble-wrap texture */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${isMobile ? '/assets/lockscreen-texture-mobile.webp' : '/assets/lockscreen-texture.webp'}')`,
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
          src={isMobile ? '/assets/lockscreen-logo-mobile.webp' : '/assets/lockscreen-logo.webp'}
          alt="Know Your Place Logo"
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
