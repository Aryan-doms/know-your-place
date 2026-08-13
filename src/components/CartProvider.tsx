'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { products } from '@/lib/data';

export type CartItem = {
  id: string; // variant id
  productId: string;
  title: string;
  variantTitle: string;
  price: string;
  image: string;
  quantity: number;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  isCartOpen: boolean;
  setIsCartOpen: (isOpen: boolean) => void;
  cartTotal: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('kyd_cart');
    if (saved) {
      try {
        const parsed: CartItem[] = JSON.parse(saved);
        const synced = parsed.map((item) => {
          const prod = products.find((p: any) => p.id.toString() === item.productId || p.variants.some((v: any) => v.id.toString() === item.id));
          if (prod) {
            const variant = prod.variants.find((v: any) => v.id.toString() === item.id) || prod.variants[0];
            return {
              ...item,
              price: variant?.price || item.price,
            };
          }
          return item;
        });
        setItems(synced);
      } catch (e) {
        console.error('Failed to load cart', e);
      }
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('kyd_cart', JSON.stringify(items));
    }
  }, [items, isLoaded]);

  const addToCart = (newItem: CartItem) => {
    setItems((currentItems) => {
      const existing = currentItems.find(item => item.id === newItem.id);
      if (existing) {
        return currentItems.map(item =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...currentItems, newItem];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: string) => {
    setItems(current => current.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setItems(current =>
      current.map(item => (item.id === id ? { ...item, quantity } : item))
    );
  };

  const cartTotal = items.reduce((total, item) => {
    return total + parseFloat(item.price) * item.quantity;
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
