import { createContext, useContext, useEffect, useState } from "react";
import { api } from "../services/api";

const OrderContext = createContext(null);

export function OrderProvider({ children }) {
  const [order, setOrder] = useState(null);
  const [orderId, setOrderId] = useState(localStorage.getItem("orderId"));

  const clearOrder = async() => {

    await api.delete(`/order/${orderId}/clear`);
    localStorage.removeItem("orderId");
    setOrder(null);
    setOrderId(null);
  };

  // 🔥 buscar order ao carregar
  useEffect(() => {
    if (!orderId) return;

    async function fetchOrder() {
      try {
        const res = await api.get(`/order/${orderId}`);
        setOrder(res.data);
      } catch (err) {
        console.error("Erro ao buscar order:", err);

        if (err.response?.status === 403 || err.response?.status === 404) {
          clearOrder();
        }
      }
    }

    fetchOrder();
  }, [orderId]);

  // ✅ criar order
  const createOrder = async (data) => {
    try {
      const res = await api.post("/order", data);

      localStorage.setItem("orderId", res.data._id);
      setOrderId(res.data._id); // 🔥 IMPORTANTE
      setOrder(res.data);
      console.log("ORDER CRIADA:", res.data);
      return res.data;
    } catch (err) {
      console.error("Erro ao criar order:", err);
      return null;
    }
  };

  // ✅ add produto
  const addProduct = async (product, overrideOrderId = null) => {
    const targetOrderId = overrideOrderId || orderId;

    if (!targetOrderId) {
      console.error("Order ainda não existe!");
      return;
    }

    try {
      const res = await api.post(`/order/${targetOrderId}/product`, {
        productId: product.id,
        quantity: product.quantidade || 1,
        sabores: product.sabores || [],
      });

      setOrder(res.data);
    } catch (err) {
      if (err.response?.status === 403 || err.response?.status === 404) {
        clearOrder();
      }
      console.error("Erro ao adicionar produto:", err);
    }
  };

  // ✅ remove produto
  const removeProduct = async (productId) => {
    try {
      const res = await api.delete(
        `/order/${orderId}/product/${productId}`,
      );

      setOrder(res.data);
    } catch (err) {
      console.error("Erro ao remover:", err);
    }
  };

  // ✅ update quantidade
  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await api.put(`/order/${orderId}/product/${productId}`, {
        quantity,
      });

      setOrder(res.data);
    } catch (err) {
      console.error("Erro ao atualizar qty:", err);
    }
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
