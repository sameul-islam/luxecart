"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import type { Product } from "../../../public/all_product";

interface CartItem extends Product {
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

interface ShopContextType {
  cart: CartItem[];
  addToCart: (p: CartItem) => void;
  removeFromCart: (id: number) => void;
  cartCount: number;
  searchTerm: string;
  setSearchTerm: (s: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

  const addToCart = (p: CartItem) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === p.id);
      if (existing) {
        return prev.map((item) =>
          item.id === p.id
            ? { ...item, quantity: item.quantity + p.quantity }
            : item
        );
      }
      return [...prev, p];
    });
  };


  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };


  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <ShopContext.Provider
      value={{ cart, addToCart, removeFromCart, cartCount, searchTerm, setSearchTerm }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => {
  const ctx = useContext(ShopContext);
  if (!ctx) throw new Error("useShop must be used inside ShopProvider");
  return ctx;
};
