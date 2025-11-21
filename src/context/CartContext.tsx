"use client";

import React, { createContext, useContext, useEffect, useState, ReactNode } from "react";

interface Product {
  quantity: number;
  id: string | number;
  name: string;
  gender?: string;
  category?: string;
  price: number;
  imageUrl: string;
  description?: string;
}

interface CartContextType {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string | number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<Product[]>([]);


  useEffect(() => {
    const stored = localStorage.getItem("cart");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (stored) setCart(JSON.parse(stored));
  }, []);


  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    if (cart.some((p) => p.id === product.id)) {
      alert("Item already in cart!");
      return;
    }
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (id: string | number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};


export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};
