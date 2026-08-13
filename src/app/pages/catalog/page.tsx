'use client';

import Link from 'next/link';
import { useState, useMemo } from 'react';
import { products } from '@/lib/data';
import { useCart } from '@/components/CartProvider';

// Map product handles to filter categories
const PRODUCT_CATEGORIES: Record<string, string[]> = {
  'give-girls-gun-t-shirt-t006':            ['T-Shirts'],
  'abs-trompe-loeil-t-shirt-t001':          ['T-Shirts'],
  'horny-television':                        ['T-Shirts'],
  'om-mag-tee':                             ['T-Shirts'],
  'i-love-kyd-tee':                         ['T-Shirts'],
  'demotivation-poster':                    ['T-Shirts'],
  'abs-trompe-loeil-tee':                   ['T-Shirts'],
  '1980s-button-down-shirt':                ['Shirts'],
  'trompe-l-oeil-femme-fatale-shirt':       ['Shirts'],
  'anna-hoodie':                            ['Hoodies'],
  'anna-summer-vest':                       ['Vests'],
  'kyd-signature-leather-jacket':           ['Jackets'],
  'kyd-x-lead-a-001':                       ['Jackets'],
  'kyd-x-lead-a-003':                       ['Jackets'],
  'kyds-camo-jeans-d002':                   ['Jeans'],
  'kyd-the-gambler-jeans':                  ['Jeans'],
  'kyd-trompe-l-oeil-nehle-pe-dehla-skirt': ['Skirts'],
  'bag-ass':                                ['Bags'],
  'kyd-raw-denim-sneakers':                 ['Shoes'],
};

const FILTER_GROUPS = [
  { label: 'TOP',         tags: ['T-Shirts', 'Shirts', 'Hoodies', 'Vests', 'Jackets'] },
  { label: 'BOTTOM',      tags: ['Jeans', 'Skirts'] },
  { label: 'ACCESSORIES', tags: ['Bags', 'Shoes'] },
];

function extractSku(title: string): string {
  const match = title.match(/([A-Z]{1,4}\d{3,4})$/);
  return match ? match[1] : '';
}

export default function Catalog() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set());
  const { items, setIsCartOpen } = useCart();

  const totalItems = items.reduce((acc: number, item: any) => acc + item.quantity, 0);

  const toggleFilter = (tag: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(tag)) next.delete(tag);
      else next.add(tag);
      return next;
    });
  };

  const filteredProducts = useMemo(() => {
    if (activeFilters.size === 0) return products;
    return products.filter((p: any) => {
      const cats = PRODUCT_CATEGORIES[p.handle] || [];
      return cats.some(c => activeFilters.has(c));
    });
  }, [activeFilters]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f5f5f5', position: 'relative' }}>

      {/* Bubble wrap texture — fixed so it covers the whole viewport while scrolling */}
      <div style={{
        position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0,
      }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: "url('/assets/lockscreen-texture.webp')",
          backgroundSize: '600px',
          backgroundRepeat: 'repeat',
          filter: 'invert(1)',
          opacity: 0.12,
        }} />
      </div>

      {/* All interactive content sits above texture via z-index */}
      {/* Sidebar backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          style={{ position: 'fixed', inset: 0, zIndex: 40, backgroundColor: 'rgba(0,0,0,0.08)' }}
        />
      )}

      {/* Left Sidebar */}
      <div style={{
        position: 'fixed', top: 0, left: sidebarOpen ? 0 : -340,
        width: 'min(320px, 85vw)', maxWidth: '85vw', height: '100vh', backgroundColor: '#fff',
        zIndex: 50, transition: 'left 0.28s ease',
        display: 'flex', flexDirection: 'column',
        borderRight: '1px solid #e0e0e0',
      }}>
        {/* Close */}
        <div style={{ padding: '20px 20px 12px', borderBottom: '1px solid #eee' }}>
          <button
            onClick={() => setSidebarOpen(false)}
            style={{
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              fontWeight: 700, fontSize: 13, letterSpacing: '0.04em',
              border: '1.5px solid #000', padding: '4px 10px',
              background: 'transparent', cursor: 'pointer', color: '#000',
            }}
          >
            [x]
          </button>
        </div>

        {/* Filters */}
        <div style={{ padding: '0 24px', flex: 1, overflowY: 'auto' }}>
          {FILTER_GROUPS.map((group) => (
            <div key={group.label} style={{ borderBottom: '1px solid #eee', padding: '16px 0' }}>
              <div style={{
                fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                fontWeight: 700, fontSize: 11, letterSpacing: '0.12em',
                color: '#000', marginBottom: 10, textTransform: 'uppercase',
              }}>
                {group.label}
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {group.tags.map((tag) => {
                  const active = activeFilters.has(tag);
                  return (
                    <button
                      key={tag}
                      onClick={() => toggleFilter(tag)}
                      style={{
                        fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                        fontSize: 11, fontWeight: active ? 700 : 400,
                        border: '1px solid #000',
                        padding: '5px 12px',
                        background: active ? '#000' : 'transparent',
                        color: active ? '#fff' : '#000',
                        cursor: 'pointer', letterSpacing: '0.04em',
                        transition: 'all 0.15s',
                      }}
                    >
                      {tag}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}

          {/* Clear filters */}
          {activeFilters.size > 0 && (
            <div style={{ padding: '14px 0' }}>
              <button
                onClick={() => setActiveFilters(new Set())}
                style={{
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                  fontSize: 11, color: '#666', background: 'none',
                  border: 'none', cursor: 'pointer', letterSpacing: '0.04em',
                  textDecoration: 'underline',
                }}
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Bottom icons */}
        <div style={{
          padding: '16px 24px', borderTop: '1px solid #eee',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5">
            <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
          </svg>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.5" cy="6.5" r="1" fill="#000" stroke="none" />
          </svg>
        </div>
      </div>

      {/* Top bar */}
      <div style={{
        position: 'sticky', top: 0, zIndex: 30,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '14px 20px', backgroundColor: 'transparent',
      }}>
        <button
          onClick={() => setSidebarOpen(true)}
          style={{
            fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
            fontWeight: 700, fontSize: 13, letterSpacing: '0.04em',
            border: '1.5px solid #000', padding: '4px 10px',
            background: 'transparent', cursor: 'pointer', color: '#000',
          }}
        >
          {activeFilters.size > 0 ? `[${activeFilters.size}]` : '[+]'}
        </button>

        <h1 style={{
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          fontWeight: 900,
          fontSize: 'clamp(16px, 5vw, 26px)',
          color: '#000',
          position: 'absolute',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          margin: 0,
          letterSpacing: '-0.02em',
          textTransform: 'uppercase',
        }}>
          Know Your Place
        </h1>

        <button
          onClick={() => setIsCartOpen(true)}
          style={{ background: 'transparent', border: 'none', cursor: 'pointer', position: 'relative' }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#000" strokeWidth="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
            <line x1="3" y1="6" x2="21" y2="6" />
            <path d="M16 10a4 4 0 0 1-8 0" />
          </svg>
          {totalItems > 0 && (
            <span style={{
              position: 'absolute', top: -6, right: -6,
              background: '#000', color: '#fff', borderRadius: '50%',
              width: 16, height: 16, fontSize: 10, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              {totalItems}
            </span>
          )}
        </button>
      </div>

      {/* Responsive Grid CSS */}
      <style>{`
        .catalog-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          padding: 0 12px 80px;
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }
        @media (max-width: 768px) {
          .catalog-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            padding: 0 8px 60px !important;
          }
        }
      `}</style>

      {/* Active filter pills */}
      {activeFilters.size > 0 && (
        <div style={{ padding: '0 20px 12px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
          {[...activeFilters].map(f => (
            <span key={f} style={{
              fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
              fontSize: 11, border: '1px solid #000', padding: '3px 10px',
              background: '#000', color: '#fff', letterSpacing: '0.04em',
              display: 'flex', alignItems: 'center', gap: 6,
            }}>
              {f}
              <button
                onClick={() => toggleFilter(f)}
                style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer', padding: 0, fontSize: 13, lineHeight: 1 }}
              >×</button>
            </span>
          ))}
        </div>
      )}

      {/* Product Grid */}
      <div className="catalog-grid">
        {filteredProducts.map((product: any) => {
          const sku = extractSku(product.title);
          const titleWithoutSku = product.title.replace(/\s+[A-Z]{1,4}\d{3,4}$/, '').trim();
          const mainImage = product.images[0] || '';

          return (
            <Link
              key={product.id}
              href={`/product/${product.handle}`}
              style={{ textDecoration: 'none', display: 'block', padding: '12px 12px 36px' }}
            >
              <div style={{ backgroundColor: 'transparent' }}>
                <img
                  src={mainImage}
                  alt={product.title}
                  style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'contain' }}
                />
              </div>
              <div style={{
                display: 'flex', alignItems: 'flex-start',
                justifyContent: 'space-between', marginTop: 8, gap: 8,
              }}>
                <span style={{
                  fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                  fontSize: 11, fontWeight: 700, textTransform: 'uppercase',
                  letterSpacing: '0.05em', color: '#000', lineHeight: 1.3,
                }}>
                  {titleWithoutSku}
                </span>
                {sku && (
                  <span style={{
                    fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
                    fontSize: 11, fontWeight: 700, color: '#000',
                    letterSpacing: '0.04em', flexShrink: 0,
                  }}>
                    {sku}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* 15% off badge */}
      <div style={{
        position: 'fixed', right: 0, top: '50%',
        zIndex: 20, backgroundColor: '#fff',
        border: '1px solid #ccc',
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        writingMode: 'vertical-rl', textOrientation: 'mixed',
        padding: '14px 10px', cursor: 'pointer',
        display: 'flex', alignItems: 'center', gap: 8,
        transform: 'translateY(-50%)',
      }}>
        <span style={{
          fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif',
          fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#000',
        }}>
          15% off
        </span>
        <span style={{ fontSize: 13, color: '#999', fontWeight: 300 }}>×</span>
      </div>
    </div>
  );
}
