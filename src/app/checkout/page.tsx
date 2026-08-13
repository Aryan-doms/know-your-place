'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/components/CartProvider';

const INDIAN_STATES = [
  'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat',
  'Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh',
  'Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab',
  'Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh',
  'Uttarakhand','West Bengal','Delhi','Jammu & Kashmir','Ladakh',
];

function FloatingInput({ label, type = "text", value = "", onChange, icon }: any) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;
  
  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <label style={{
        position: 'absolute',
        left: '12px',
        top: active ? '6px' : '16px',
        fontSize: active ? '11px' : '14px',
        color: '#737373',
        transition: 'all 0.2s',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '20px 12px 6px',
          border: '1px solid #d9d9d9',
          borderRadius: '5px',
          backgroundColor: '#fff',
          fontSize: '14px',
          boxSizing: 'border-box',
          outline: focused ? '2px solid #1773b0' : 'none',
          outlineOffset: '-1px'
        }}
      />
      {icon && (
        <div style={{ position: 'absolute', right: '12px', top: '15px', color: '#737373' }}>
          {icon}
        </div>
      )}
    </div>
  );
}

function FloatingSelect({ label, value = "", onChange, options }: any) {
  const [focused, setFocused] = useState(false);
  const active = focused || value.length > 0;

  return (
    <div style={{ position: 'relative', width: '100%' }}>
      <label style={{
        position: 'absolute',
        left: '12px',
        top: active ? '6px' : '16px',
        fontSize: active ? '11px' : '14px',
        color: '#737373',
        transition: 'all 0.2s',
        pointerEvents: 'none',
        zIndex: 1
      }}>
        {label}
      </label>
      <select
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          width: '100%',
          padding: '20px 36px 6px 12px',
          border: '1px solid #d9d9d9',
          borderRadius: '5px',
          backgroundColor: '#fff',
          fontSize: '14px',
          boxSizing: 'border-box',
          appearance: 'none',
          outline: focused ? '2px solid #1773b0' : 'none',
          outlineOffset: '-1px',
          cursor: 'pointer'
        }}
      >
        <option value="" disabled hidden></option>
        {options.map((opt: any) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      <div style={{ position: 'absolute', right: '12px', top: '18px', pointerEvents: 'none' }}>
        <svg width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="#717171" strokeWidth="1.5">
          <path d="M1 1L5 5L9 1" />
        </svg>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  const { items, cartTotal } = useCart();
  const [discountCode, setDiscountCode] = useState('');
  
  const [form, setForm] = useState({
    email: '',
    country: 'India',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Gujarat',
    pin: '',
    phone: ''
  });

  const handleChange = (field: string) => (e: any) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
  };

  const total = cartTotal;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', fontFamily: 'Helvetica Neue, Helvetica, Arial, sans-serif', color: '#1a1a1a' }}>
      
      {/* Mobile Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .checkout-left {
            flex: 1 1 100% !important;
            padding: 24px 16px !important;
            border-right: none !important;
          }
          .checkout-right {
            flex: 1 1 100% !important;
            padding: 24px 16px !important;
            border-left: none !important;
            border-top: 1px solid #e1e1e1 !important;
            position: relative !important;
            height: auto !important;
          }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', minHeight: '100vh', flexWrap: 'wrap' }}>
        
        {/* LEFT PANEL */}
        <div className="checkout-left" style={{ flex: '1 1 55%', padding: '50px 48px 50px 24px', borderRight: '1px solid #e1e1e1', boxSizing: 'border-box' }}>
          
          <div style={{ marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontWeight: 900, fontSize: 'clamp(20px, 6vw, 28px)', textTransform: 'uppercase' }}>Know Your Place</span>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" />
              <path d="M3 6h18" />
              <path d="M16 10a4 4 0 01-8 0" />
            </svg>
          </div>

          {/* Contact */}
          <div style={{ marginBottom: 32 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <h2 style={{ fontSize: 18, fontWeight: 500, margin: 0 }}>Contact</h2>
              <Link href="#" style={{ fontSize: 13, color: '#1773b0', textDecoration: 'underline' }}>Log in</Link>
            </div>
            
            <FloatingInput 
              label="Email" 
              value={form.email} 
              onChange={handleChange('email')} 
              icon={<span style={{fontSize: '14px', fontWeight: 'bold', color: '#888', border: '1px solid #888', borderRadius: '50%', width: 16, height: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>?</span>}
            />
            
            <label style={{ display: 'flex', alignItems: 'center', fontSize: 13, cursor: 'pointer', marginTop: 10 }}>
              <input type="checkbox" style={{ marginRight: 8, accentColor: '#000', width: '16px', height: '16px' }} />
              Email me with news and offers
            </label>
          </div>

          {/* Delivery */}
          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Delivery</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              
              <FloatingSelect 
                label="Country/Region" 
                value={form.country} 
                onChange={handleChange('country')} 
                options={['India', 'United States', 'United Kingdom']} 
              />
              
              <div style={{ display: 'flex', gap: 10 }}>
                <FloatingInput label="First name (optional)" value={form.firstName} onChange={handleChange('firstName')} />
                <FloatingInput label="Last name" value={form.lastName} onChange={handleChange('lastName')} />
              </div>
              
              <FloatingInput 
                label="Address" 
                value={form.address} 
                onChange={handleChange('address')} 
                icon={
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8"/>
                    <path d="M21 21l-4.35-4.35"/>
                  </svg>
                }
              />
              
              <FloatingInput label="Apartment, suite, etc. (optional)" value={form.apartment} onChange={handleChange('apartment')} />
              <FloatingInput label="City" value={form.city} onChange={handleChange('city')} />
              
              <div style={{ display: 'flex', gap: 10 }}>
                <div style={{ flex: 1 }}>
                  <FloatingSelect label="State" value={form.state} onChange={handleChange('state')} options={INDIAN_STATES} />
                </div>
                <div style={{ flex: 1 }}>
                  <FloatingInput label="PIN code" value={form.pin} onChange={handleChange('pin')} />
                </div>
              </div>
              
              <FloatingInput 
                label="Phone" 
                value={form.phone} 
                onChange={handleChange('phone')}
                icon={<span style={{fontSize: '14px', fontWeight: 'bold', color: '#888', border: '1px solid #888', borderRadius: '50%', width: 16, height: 16, display: 'inline-flex', alignItems: 'center', justifyContent: 'center'}}>?</span>}
              />
            </div>
            
            <label style={{ display: 'flex', alignItems: 'center', fontSize: 13, cursor: 'pointer', marginTop: 12 }}>
              <input type="checkbox" style={{ marginRight: 8, accentColor: '#000', width: '16px', height: '16px' }} />
              Save this information for next time
            </label>
          </div>

          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Shipping method</h2>
            <div style={{ backgroundColor: '#f5f5f5', padding: '16px', borderRadius: '5px', fontSize: '13px', color: '#555' }}>
              Enter your shipping address to view available shipping methods.
            </div>
          </div>

          <div style={{ marginBottom: 32 }}>
            <h2 style={{ fontSize: 18, fontWeight: 500, marginBottom: 12 }}>Payment</h2>
            <div style={{ color: '#737373', fontSize: '13px' }}>
              All transactions are secure and encrypted.
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="checkout-right" style={{
          flex: '0 0 45%', padding: '50px 24px 50px 48px',
          backgroundColor: '#f5f5f5', borderLeft: '1px solid #e1e1e1', position: 'sticky', top: 0, height: '100vh', overflowY: 'auto', boxSizing: 'border-box'
        }}>
          
          <div style={{ marginBottom: 24 }}>
            {items.map(item => (
              <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
                <div style={{ position: 'relative', flexShrink: 0 }}>
                  <div style={{ width: 64, height: 64, border: '1px solid #e1e1e1', borderRadius: 8, overflow: 'hidden', backgroundColor: '#fff' }}>
                    <img src={item.image} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <span style={{
                    position: 'absolute', top: -8, right: -8, backgroundColor: '#1773b0', // Blue quantity badge
                    color: '#fff', borderRadius: '50%', width: 20, height: 20,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, fontWeight: 600,
                  }}>{item.quantity}</span>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, fontWeight: 500 }}>{item.title}</div>
                  <div style={{ fontSize: 12, color: '#717171', marginTop: 4 }}>{item.variantTitle}</div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 500 }}>
                  ₹{(parseInt(item.price) * item.quantity).toLocaleString()}.00
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: 'flex', gap: 10, marginBottom: 24, borderTop: '1px solid #e1e1e1', paddingTop: 24 }}>
            <FloatingInput label="Discount code" value={discountCode} onChange={(e: any) => setDiscountCode(e.target.value)} />
            <button style={{
              padding: '0 20px', backgroundColor: '#e0e0e0', border: '1px solid #d9d9d9',
              borderRadius: 5, fontSize: 14, fontWeight: 600, cursor: 'pointer',
              color: '#888', flexShrink: 0, height: '54px'
            }}>
              Apply
            </button>
          </div>

          <div style={{ borderTop: '1px solid #e1e1e1', paddingTop: 16, display: 'flex', flexDirection: 'column', gap: 12, fontSize: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Subtotal</span>
              <span style={{ fontWeight: 500 }}>₹{cartTotal.toLocaleString()}.00</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Shipping ⓘ</span>
              <span style={{ color: '#717171' }}>Enter shipping address</span>
            </div>
          </div>

          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            marginTop: 16, paddingTop: 16, borderTop: '1px solid #e1e1e1',
          }}>
            <span style={{ fontSize: 16, fontWeight: 500 }}>Total</span>
            <div>
              <span style={{ fontSize: 12, color: '#717171', marginRight: 8 }}>INR</span>
              <span style={{ fontSize: 24, fontWeight: 700 }}>₹{cartTotal.toLocaleString()}.00</span>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
