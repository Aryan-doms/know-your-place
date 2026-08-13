'use client';

import { useState, useEffect } from 'react';

export default function PasswordProtection({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (localStorage.getItem('store_access') === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  if (!mounted) return null; // Avoid hydration mismatch

  if (isAuthenticated) {
    return <>{children}</>;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'KYD2023') {
      localStorage.setItem('store_access', 'true');
      setIsAuthenticated(true);
    } else {
      setError(true);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif' }}>
      
      <div style={{ marginBottom: 40 }}>
        {/* Shopify logo mock */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25.7 8.2l-3-6.1c-.2-.4-.8-.6-1.2-.4L6.9 8.2c-.4.2-.6.7-.4 1.1l7.8 17.6c.1.3.5.5.9.5h.1c.4 0 .7-.3.8-.7L19.2 14l6.1 4.3c.3.2.8.2 1.1-.1s.3-.8.1-1.1l-6-6.8 5.6-1.1c.4-.1.7-.5.6-1z" fill="#95BF47"/>
            <path d="M21.5 2.1l-14.6 6.5C6.5 8.8 6.1 9.4 6.3 10l7.8 17.6c.1.3.5.5.9.5h.1c.4 0 .7-.3.8-.7L19 14l-8.6-2.7L21.5 2.1z" fill="#5E8E3E"/>
          </svg>
          <span style={{ fontSize: 26, fontWeight: 700, letterSpacing: '-1px' }}>shopify</span>
        </div>
      </div>

      <div style={{ width: '100%', maxWidth: 400, padding: '0 20px' }}>
        <h1 style={{ fontSize: 26, fontWeight: 400, color: '#202223', marginBottom: 12 }}>Know Your Place</h1>
        <p style={{ fontSize: 14, color: '#6d7175', marginBottom: 24, lineHeight: 1.4 }}>
          This store is password protected. Use the password to enter the store.
        </p>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div>
            <label style={{ display: 'block', fontSize: 14, color: '#202223', marginBottom: 6 }}>Enter store password</label>
            <input 
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError(false);
              }}
              style={{
                width: '100%',
                padding: '10px 12px',
                border: `1px solid ${error ? '#d20000' : '#c9cccf'}`,
                borderRadius: 4,
                fontSize: 14,
                outline: 'none',
                boxSizing: 'border-box',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => {
                if (!error) e.target.style.borderColor = '#000';
              }}
              onBlur={(e) => {
                if (!error) e.target.style.borderColor = '#c9cccf';
              }}
            />
            {error && <div style={{ color: '#d20000', fontSize: 12, marginTop: 4 }}>Incorrect password</div>}
          </div>
          <button 
            type="submit"
            style={{
              alignSelf: 'flex-start',
              backgroundColor: '#008060',
              color: '#fff',
              border: 'none',
              borderRadius: 4,
              padding: '10px 24px',
              fontSize: 14,
              fontWeight: 500,
              cursor: 'pointer',
              transition: 'background-color 0.2s'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#006e52'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#008060'}
          >
            Enter
          </button>
        </form>

        <div style={{ marginTop: 40, fontSize: 14, color: '#6d7175' }}>
          Are you the store owner? <a href="https://admin.shopify.com" style={{ color: '#2c6ecb', textDecoration: 'underline', textUnderlineOffset: 3 }}>Log in here</a>
        </div>
      </div>
    </div>
  );
}
