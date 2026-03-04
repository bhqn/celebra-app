import { createContext, useContext, useMemo, useState } from "react";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); 
  // items = [{ id, nome, foto, preco, avaliacao, loja, qty }]

  const parsePrice = (preco) => {
    // "R$45,00" -> 45.00
    const normalized = preco
      .replace("R$", "")
      .trim()
      .replace(/\./g, "")
      .replace(",", ".");
    const value = Number(normalized);
    return Number.isFinite(value) ? value : 0;
  };

  const addToCart = (product) => {
    setItems((prev) => {
      const found = prev.find((p) => p.id === product.id);
      if (found) {
        return prev.map((p) =>
          p.id === product.id ? { ...p, qty: p.qty + 1 } : p
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const increaseQty = (id) => {
    setItems((prev) =>
      prev.map((p) => (p.id === id ? { ...p, qty: p.qty + 1 } : p))
    );
  };

  const decreaseQty = (id) => {
    setItems((prev) =>
      prev
        .map((p) => (p.id === id ? { ...p, qty: p.qty - 1 } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const removeFromCart = (id) => {
    setItems((prev) => prev.filter((p) => p.id !== id));
  };

  const clearCart = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((acc, p) => acc + p.qty, 0),
    [items]
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, p) => acc + parsePrice(p.preco) * p.qty, 0),
    [items]
  );

  const value = useMemo(
    () => ({
      items,
      addToCart,
      increaseQty,
      decreaseQty,
      removeFromCart,
      clearCart,
      totalItems,
      totalPrice,
    }),
    [items, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}