'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from './CartProvider';
import Link from 'next/link';

export default function CartDrawer() {
  const { isCartOpen, setIsCartOpen, items, updateQuantity, removeFromCart, cartTotal } = useCart();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsCartOpen(false)}
            style={{
              position: 'fixed',
              top: 0, left: 0, right: 0, bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
              backdropFilter: 'blur(2px)',
              zIndex: 50,
            }}
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              height: '100%',
              width: '380px',
              backgroundColor: '#fff',
              zIndex: 51,
              display: 'flex',
              flexDirection: 'column',
              boxShadow: '-4px 0 15px rgba(0,0,0,0.1)',
            }}
          >
            <div style={{ padding: '20px', display: 'flex', justifyContent: 'flex-end' }}>
              <button onClick={() => setIsCartOpen(false)} style={{ cursor: 'pointer', background: 'none', border: 'none', fontSize: '16px', fontWeight: 'bold' }}>
                [-]
              </button>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', padding: '0 20px' }}>
              {items.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '40px', fontSize: '14px', textTransform: 'uppercase' }}>Your cart is empty</div>
              ) : (
                items.map(item => (
                  <div key={item.id} style={{ display: 'flex', marginBottom: '20px', gap: '15px' }}>
                    <div style={{ width: '60px', height: '60px', flexShrink: 0, backgroundColor: '#f5f5f5' }}>
                      <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    </div>
                    <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <span style={{ fontSize: '12px', textTransform: 'uppercase', fontWeight: 600 }}>{item.title}</span>
                        <span style={{ fontSize: '12px' }}>₹{parseInt(item.price).toLocaleString()}</span>
                      </div>
                      <div style={{ fontSize: '11px', color: '#888', textTransform: 'uppercase', marginBottom: '10px' }}>{item.variantTitle}</div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px' }}>
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>−</button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}>+</button>
                        </div>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '11px', textTransform: 'uppercase', textDecoration: 'underline', padding: 0 }}>
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div style={{ backgroundColor: '#f9f9f9', padding: '20px', borderTop: '1px solid #eee' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span>Subtotal</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                  <span>Shipping</span>
                  <span>FREE</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', fontSize: '13px' }}>
                  <span>Taxes</span>
                  <span>Inclusive of all taxes</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', fontSize: '16px', fontWeight: 'bold' }}>
                  <span>Total</span>
                  <span>₹{cartTotal.toLocaleString()}</span>
                </div>
                <Link
                  href="/checkout"
                  onClick={() => setIsCartOpen(false)}
                  style={{
                    display: 'block',
                    width: '100%',
                    padding: '16px 0',
                    backgroundColor: '#000',
                    color: '#fff',
                    textAlign: 'center',
                    textTransform: 'uppercase',
                    fontWeight: 'bold',
                    textDecoration: 'none',
                    fontSize: '14px'
                  }}
                >
                  Checkout
                </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
