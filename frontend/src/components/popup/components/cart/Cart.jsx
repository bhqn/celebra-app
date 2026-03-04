import { useCart } from "../../../../contexts/useCart";

function Cart() {
  const {
    items,
    increaseQty,
    decreaseQty,
    removeFromCart,
    clearCart,
    totalItems,
    totalPrice,
  } = useCart();

  const formatBRL = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="cart__content">
      <p>Carrinho</p>

      {items.length === 0 ? (
        <p>Seu carrinho está vazio.</p>
      ) : (
        <>
          <p>Itens: {totalItems}</p>

          <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
            {items.map((item) => (
              <li
                key={item.id}
                style={{
                  display: "flex",
                  gap: 12,
                  alignItems: "center",
                  padding: "10px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                <img
                  src={item.foto}
                  alt={item.nome}
                  style={{ width: 56, height: 56, objectFit: "cover", borderRadius: 10 }}
                />

                <div style={{ flex: 1 }}>
                  <p style={{ margin: 0, fontWeight: 700 }}>{item.nome}</p>
                  <p style={{ margin: 0, fontSize: 12 }}>{item.loja}</p>
                  <p style={{ margin: 0, fontSize: 12 }}>{item.preco}</p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <button onClick={() => decreaseQty(item.id)}>-</button>
                  <span>{item.qty}</span>
                  <button onClick={() => increaseQty(item.id)}>+</button>
                </div>

                <button onClick={() => removeFromCart(item.id)}>Remover</button>
              </li>
            ))}
          </ul>

          <div style={{ marginTop: 12, display: "flex", justifyContent: "space-between" }}>
            <strong>Total:</strong>
            <strong>{formatBRL(totalPrice)}</strong>
          </div>

          <div style={{ marginTop: 12, display: "flex", gap: 10 }}>
            <button onClick={clearCart}>Limpar</button>
            <button>Finalizar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;