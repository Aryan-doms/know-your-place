'use client';

import React, { useState } from 'react';
import { products } from '@/lib/data';
import { notFound } from 'next/navigation';
import { useCart } from '@/components/CartProvider';
import Link from 'next/link';

export default function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = React.use(params);
  const product = products.find((p: any) => p.handle === handle);
  
  if (!product) return notFound();

  const { addToCart, setIsCartOpen } = useCart();
  
  const displaySizes = product.variants.map((v: any) => v.title).filter((v: string) => v.length < 5);
  const sizes = displaySizes.length > 0 ? displaySizes : ['S', 'M', 'L', 'XL', '2XL'];
  
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(false);

  const handleAddToCart = () => {
    const variant = product.variants.find((v: any) => v.title === selectedSize) || product.variants[0];
    addToCart({
      id: variant.id.toString(),
      productId: product.id.toString(),
      title: product.title,
      variantTitle: selectedSize,
      price: variant.price,
      image: product.images[0],
      quantity: 1,
    });
    setIsCartOpen(true);
  };

  // Strip HTML and get product details
  const extractDescription = (html: string) => {
    const tempDiv = typeof document !== 'undefined' ? document.createElement('div') : null;
    if (tempDiv) {
      tempDiv.innerHTML = html.split('<strong>Product Details</strong>')[0];
      return tempDiv.textContent || tempDiv.innerText || '';
    }
    return html.replace(/<[^>]+>/g, '').split('Product Details')[0];
  };

  const extractList = (html: string) => {
    const match = html.match(/<ul>([\s\S]*?)<\/ul>/);
    if (match) {
      return match[1].replace(/<li>/g, '• ').replace(/<\/li>/g, '\n').replace(/<[^>]+>/g, '');
    }
    return '';
  };

  const description = extractDescription(product.body_html || '');
  const detailsList = extractList(product.body_html || '').split('\n').filter(Boolean);

  // More like this (3 random products)
  const moreProducts = products.filter((p: any) => p.id !== product.id).sort(() => 0.5 - Math.random()).slice(0, 3);

  return (
    <div style={{ position: 'relative', minHeight: '100vh', paddingBottom: '100px', backgroundColor: '#fff', color: '#000', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif' }}>
      
      {/* Background bubble wrap */}
      <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 0, pointerEvents: 'none' }}>
        <div style={{ width: '100%', height: '100%', backgroundImage: 'url(/bubble-wrap.jpg)', filter: 'invert(1)', opacity: 0.12, backgroundSize: 'cover' }} />
      </div>

      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Header */}
        <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 24px' }}>
          <div style={{ fontSize: '20px', cursor: 'pointer', fontWeight: 300 }}>[+]</div>
          <Link href="/pages/catalog" style={{ textDecoration: 'none', color: 'inherit' }}>
            <h1 style={{ fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em', margin: 0, fontSize: '18px' }}>Know Your Place</h1>
          </Link>
          <div style={{ cursor: 'pointer' }} onClick={() => setIsCartOpen(true)}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>
        </header>

        {/* Responsive CSS */}
        <style>{`
          .product-layout {
            display: flex;
            flex-wrap: wrap;
            gap: 40px;
            padding: 0 40px;
            max-width: 1400px;
            margin: 40px auto 0;
          }
          .product-image-col {
            flex: 1 1 55%;
            min-width: 300px;
            background-color: #f0f0f0;
            display: flex;
            justify-content: center;
            align-items: center;
          }
          .product-details-col {
            flex: 1 1 35%;
            min-width: 280px;
            display: flex;
            flex-direction: column;
          }
          @media (max-width: 768px) {
            .product-layout {
              padding: 0 16px !important;
              margin-top: 16px !important;
              gap: 24px !important;
            }
            .product-image-col, .product-details-col {
              flex: 1 1 100% !important;
              width: 100% !important;
            }
            .more-like-this-wrapper {
              padding: 40px 16px !important;
            }
            .more-like-this-grid {
              flex-wrap: wrap !important;
              gap: 12px !important;
            }
            .more-like-this-item {
              flex: 1 1 45% !important;
              min-width: 130px !important;
            }
          }
        `}</style>

        {/* Main Content */}
        <div className="product-layout">
          
          {/* Left Image */}
          <div className="product-image-col">
            <img src={product.images[0]} alt={product.title} style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
          </div>

          {/* Right Details */}
          <div className="product-details-col">
            <h2 style={{ textTransform: 'uppercase', fontWeight: 700, fontSize: '13px', letterSpacing: '0.08em', margin: '0 0 8px 0' }}>
              {product.title}
            </h2>
            <div style={{ fontSize: '14px', marginBottom: '24px' }}>
              ₹{parseInt(product.variants[0]?.price || '0').toLocaleString()}
            </div>

            <div style={{ display: 'flex', gap: '10px', marginBottom: '32px', flexWrap: 'wrap' }}>
              {sizes.map((size: string) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    border: '1px solid #000',
                    backgroundColor: selectedSize === size ? '#000' : '#fff',
                    color: selectedSize === size ? '#fff' : '#000',
                    fontSize: '12px',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  {size}
                </button>
              ))}
            </div>

            <button
              onClick={handleAddToCart}
              style={{
                width: '100%',
                padding: '14px 0',
                border: '1.5px solid #000',
                backgroundColor: '#fff',
                color: '#000',
                textTransform: 'uppercase',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                marginBottom: '10px'
              }}
            >
              Add to Cart
            </button>
            <button
              onClick={handleAddToCart}
              style={{
                width: '100%',
                padding: '14px 0',
                border: 'none',
                backgroundColor: '#000',
                color: '#fff',
                textTransform: 'uppercase',
                fontWeight: 600,
                fontSize: '13px',
                cursor: 'pointer',
                marginBottom: '40px'
              }}
            >
              Buy Now
            </button>

            <div style={{ fontSize: '13px', lineHeight: 1.6, marginBottom: '24px' }}>
              {description}
            </div>

            <div style={{ marginBottom: '40px' }}>
              <strong style={{ fontSize: '13px' }}>Product Details</strong>
              <ul style={{ listStyleType: 'none', padding: 0, margin: '10px 0 0 0', fontSize: '13px', lineHeight: 1.6 }}>
                {detailsList.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            <div style={{ borderTop: '1px solid #eee' }}>
              <button 
                onClick={() => setSizeChartOpen(!sizeChartOpen)}
                style={{ width: '100%', background: 'none', border: 'none', padding: '15px 0', textAlign: 'left', fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 'bold' }}
              >
                [+] Size chart
              </button>
              {sizeChartOpen && <div style={{ paddingBottom: '15px', fontSize: '12px' }}>Size chart details here...</div>}
            </div>
            <div style={{ borderTop: '1px solid #eee', borderBottom: '1px solid #eee' }}>
              <button 
                onClick={() => setShippingOpen(!shippingOpen)}
                style={{ width: '100%', background: 'none', border: 'none', padding: '15px 0', textAlign: 'left', fontSize: '13px', cursor: 'pointer', textTransform: 'uppercase', fontWeight: 'bold' }}
              >
                [+] Shipping policy
              </button>
              {shippingOpen && <div style={{ paddingBottom: '15px', fontSize: '12px' }}>Shipping policy details here...</div>}
            </div>
          </div>
        </div>

        {/* More Like This */}
        <div className="more-like-this-wrapper" style={{ padding: '80px 40px', maxWidth: '1400px', margin: '0 auto' }}>
          <h3 style={{ textTransform: 'uppercase', fontSize: '14px', letterSpacing: '0.05em', marginBottom: '30px' }}>More like this</h3>
          <div className="more-like-this-grid" style={{ display: 'flex', gap: '20px' }}>
            {moreProducts.map((p: any) => (
              <div key={p.id} className="more-like-this-item" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <Link href={`/product/${p.handle}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div style={{ backgroundColor: '#f0f0f0', aspectRatio: '3/4', marginBottom: '12px' }}>
                    <img src={p.images[0]} alt={p.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', textTransform: 'uppercase' }}>
                    <span style={{ fontWeight: 600 }}>{p.title}</span>
                    <span style={{ color: '#888' }}>{p.variants[0]?.sku || p.id.toString().slice(-4)}</span>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
