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
      
      <div style={{ marginBottom: 40, textAlign: 'center' }}>
        <img src="/shopify_icon.svg" alt="Shopify" style={{ height: 36, width: 'auto' }} />
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
