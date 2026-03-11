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

  const itemsPorCategoria = items.reduce((acc, item) => {
    const categoria = item.categoria || "Outros";
    const sub = item.subcategoria || "";

    if (!acc[categoria]) {
      acc[categoria] = {};
    }

    if (!acc[categoria][sub]) {
      acc[categoria][sub] = [];
    }

    acc[categoria][sub].push(item);

    return acc;
  }, {});

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

{Object.entries(itemsPorCategoria).map(([categoria, subs]) => (
  <div key={categoria} style={{ marginBottom: 20 }}>
    <h3 style={{ marginBottom: 10 }}>{categoria}</h3>

    {Object.entries(subs).map(([subcategoria, categoriaItems]) => (
      <div key={subcategoria} style={{ marginLeft: 12, marginBottom: 8 }}>
        {subcategoria && (
          <h4 style={{ margin: "4px 0", fontWeight: 600 }}>{subcategoria}</h4>
        )}
        <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
          {categoriaItems.map((item, index) => (
            <li
              key={index}
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
                style={{
                  width: 56,
                  height: 56,
                  objectFit: "cover",
                  borderRadius: 10,
                }}
              />

              <div style={{ flex: 1 }}>
                <p style={{ margin: 0, fontWeight: 700 }}>{item.nome}</p>

                <p style={{ margin: 0, fontSize: 12 }}>{item.loja}</p>

                <p style={{ margin: 0, fontSize: 12 }}>{item.preco}</p>

                {item.sabores && (
                  <p style={{ margin: 0, fontSize: 12 }}>
                    Sabores:{" "}
                    {Object.entries(item.sabores)
                      .map(([sabor, qtd]) => `${sabor} (${qtd})`)
                      .join(", ")}
                  </p>
                )}
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <button onClick={() => decreaseQty(index)}>-</button>

                <span>{item.qty}</span>

                <button onClick={() => increaseQty(index)}>+</button>
              </div>

              <button onClick={() => removeFromCart(index)}>Remover</button>
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
))}

          <div
            style={{
              marginTop: 12,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
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