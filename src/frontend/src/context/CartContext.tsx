import { type ReactNode, createContext, useContext, useState } from "react";
import type { MenuItem } from "../backend.d";

export interface CartEntry {
  menuItem: MenuItem;
  quantity: number;
}

interface CartContextValue {
  cartItems: CartEntry[];
  addToCart: (item: MenuItem, qty?: number) => void;
  removeFromCart: (id: bigint) => void;
  updateQty: (id: bigint, qty: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);

  const addToCart = (item: MenuItem, qty = 1) => {
    setCartItems((prev) => {
      const existing = prev.find((e) => e.menuItem.id === item.id);
      if (existing) {
        return prev.map((e) =>
          e.menuItem.id === item.id ? { ...e, quantity: e.quantity + qty } : e,
        );
      }
      return [...prev, { menuItem: item, quantity: qty }];
    });
  };

  const removeFromCart = (id: bigint) => {
    setCartItems((prev) => prev.filter((e) => e.menuItem.id !== id));
  };

  const updateQty = (id: bigint, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    setCartItems((prev) =>
      prev.map((e) => (e.menuItem.id === id ? { ...e, quantity: qty } : e)),
    );
  };

  const clearCart = () => setCartItems([]);

  const totalItems = cartItems.reduce((sum, e) => sum + e.quantity, 0);
  const totalPrice = cartItems.reduce(
    (sum, e) => sum + e.menuItem.price * e.quantity,
    0,
  );

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQty,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
