import { createContext, useContext, useMemo, useState } from "react";
import { useEffect } from "react";
import { api } from "../services/api";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  // items = [{ id, nome, foto, preco, avaliacao, loja, qty }]
 const token = localStorage.getItem("token");
    // 🔥 BUSCAR CARRINHO AO CARREGAR
  useEffect(() => {
    async function fetchCart() {
      try {
        const res = await api.get("/api/cart");

        const formatted = res.data.products.map((p) => ({
          id: p.productId._id,
          nome: p.productId.nome,
          foto: p.productId.foto,
          preco: p.productId.preco,
          qty: p.quantity,
        }));

        setItems(formatted);
      } catch (err) {
        if (err.response?.status === 404) {
          setItems([]);
        } else {
          console.error("Erro ao buscar carrinho:", err);
        }
      }
    }

    fetchCart();
  }, [token]);


 const addToCart = async (product) => {
  try {
    await api.post("/api/cart", {
      products: [
        {
          productId: product.id,
          quantity: product.quantidade || 1,
        },
      ],
    });

    // Atualiza frontend (optimistic UI)
    setItems((prev) => {
      const found = prev.find(
        (p) =>
          p.id === product.id &&
          JSON.stringify(p.sabores) === JSON.stringify(product.sabores)
      );

      if (found) {
        return prev.map((p) =>
          p.id === product.id &&
          JSON.stringify(p.sabores) === JSON.stringify(product.sabores)
            ? { ...p, qty: p.qty + product.quantidade }
            : p
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
  } catch (err) {
    console.error("Erro ao adicionar no carrinho:", err);
  }
};

const increaseQty = async (index) => {
  const item = items[index];

  try {
    const newQty = item.qty + 1;

    await api.put(`/api/cart/${item.id}`, {
      quantity: newQty,
    });

    setItems((prev) =>
      prev.map((i, idx) =>
        idx === index ? { ...i, qty: newQty } : i
      )
    );
  } catch (err) {
    console.error("Erro ao aumentar quantidade:", err);
  }
};

const decreaseQty = async (index) => {
  const item = items[index];

  try {
    const newQty = item.qty - 1;

    await api.put(`/api/cart/${item.id}`, {
      quantity: newQty,
    });

    setItems((prev) =>
      prev
        .map((i, idx) =>
          idx === index ? { ...i, qty: newQty } : i
        )
        .filter((i) => i.qty > 0)
    );
  } catch (err) {
    console.error("Erro ao diminuir quantidade:", err);
  }
};

const removeFromCart = async (index) => {
  const item = items[index];

  try {
    await api.delete(`/api/cart/${item.id}`);

    setItems((prev) => prev.filter((_, i) => i !== index));
  } catch (err) {
    console.error("Erro ao remover item:", err);
  }
};

  const clearCart = () => setItems([]);

  const totalItems = useMemo(
    () => items.reduce((acc, p) => acc + p.qty, 0),
    [items],
  );

 const totalPrice = useMemo(
  () => items.reduce((acc, p) => acc + p.preco * p.qty, 0),
  [items],
)
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
