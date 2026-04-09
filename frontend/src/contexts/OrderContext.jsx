import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState(
    localStorage.getItem("orderId")
  );

  // 🔥 buscar order ao carregar
  useEffect(() => {
    if (!orderId) return;

    async function fetchOrder() {
      try {
        const res = await api.get(`/api/order/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Erro ao buscar order:", err);
      }
    }

    fetchOrder();
  }, [orderId]);

  // ✅ criar order
  const createOrder = async (data) => {
    try {
      const res = await api.post("/api/order", data);

      localStorage.setItem("orderId", res.data._id);
      setOrderId(res.data._id); // 🔥 IMPORTANTE
      setOrder(res.data);
    } catch (err) {
      console.error("Erro ao criar order:", err);
    }
  };

  // ✅ add produto
  const addProduct = async (product) => {
    try {
      const res = await api.post(
        `/api/order/${orderId}/product`,
        {
          productId: product.id,
          quantity: product.quantidade || 1,
          sabores: product.sabores || [],
        }
      );

      setOrder(res.data);
    } catch (err) {
      console.error("Erro ao adicionar produto:", err);
    }
  };

  // ✅ remove produto
  const removeProduct = async (productId) => {
    try {
      const res = await api.delete(
        `/api/order/${orderId}/product/${productId}`
      );

      setOrder(res.data);
    } catch (err) {
      console.error("Erro ao remover:", err);
    }
  };

  // ✅ update quantidade
  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await api.put(
        `/api/order/${orderId}/product/${productId}`,
        { quantity }
      );

      setOrder(res.data);
    } catch (err) {
      console.error("Erro ao atualizar qty:", err);
    }
  };

  // 🔥 RESET (muito importante pra logout / finalizar)
  const clearOrder = () => {
    localStorage.removeItem("orderId");
    setOrder(null);
    setOrderId(null);
  };

  return (
    <OrderContext.Provider
      value={{
        order,
        orderId,
        createOrder,
        addProduct,
        removeProduct,
        updateQuantity,
        clearOrder,
      }}
    >
      {children}
    </OrderContext.Provider>
  );
}

export function useOrder() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrder must be used inside OrderProvider");
  return ctx;
}