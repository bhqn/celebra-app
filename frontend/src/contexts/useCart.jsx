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
      const found = prev.find(
        (p) =>
          p.id === product.id &&
          JSON.stringify(p.sabores) === JSON.stringify(product.sabores),
      );

      if (found) {
        return prev.map((p) =>
          p.id === product.id &&
          JSON.stringify(p.sabores) === JSON.stringify(product.sabores)
            ? { ...p, qty: p.qty + product.quantidade }
            : p,
        );
      }

      return [
        ...prev,
        {
          ...product,
          qty: product.quantidade || 1,
        },
      ];
    });
  };

const increaseQty = (index) => {
  setItems((prev) =>
    prev.map((item, i) =>
      i === index ? { ...item, qty: item.qty + 1 } : item
    )
  );
};

const decreaseQty = (index) => {
  setItems((prev) =>
    prev
      .map((item, i) =>
        i === index ? { ...item, qty: item.qty - 1 } : item
      )
      .filter((item) => item.qty > 0)
  );
};

const removeFromCart = (index) => {
  setItems((prev) => prev.filter((_, i) => i !== index));
};

  const clearCart = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((acc, p) => acc + p.qty, 0),
    [items],
  );

  const totalPrice = useMemo(
    () => items.reduce((acc, p) => acc + parsePrice(p.preco) * p.qty, 0),
    [items],
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
    [items, totalItems, totalPrice],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
}
