import { useCart } from "../../../../contexts/useCart";
import "./Cart.css";

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

    if (!acc[categoria]) acc[categoria] = {};
    if (!acc[categoria][sub]) acc[categoria][sub] = [];

    acc[categoria][sub].push(item);

    return acc;
  }, {});

  const formatBRL = (value) =>
    value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="cart__content">
      <h2 className="cart__title">Seu Carrinho</h2>

      {items.length === 0 ? (
        <p className="cart__empty">Seu carrinho está vazio.</p>
      ) : (
        <>
          {/* Lista rolável */}
          <div className="cart__list">
            {Object.entries(itemsPorCategoria).map(([categoria, subs]) => (
              <div key={categoria} className="cart__category">
                <h3 className="cart__list_category">{categoria}</h3>

                {Object.entries(subs).map(([subcategoria, categoriaItems]) => (
                  <div key={subcategoria} className="cart__subcategory">
                    {subcategoria && <h4>{subcategoria}</h4>}
                    <ul>
                      {categoriaItems.map((item, index) => (
                        <li key={index} className="cart__item">
                          <img src={item.foto} alt={item.nome} />
                          <div className="cart__item-info">
                            <p className="cart__item-name">{item.nome}</p>
                            <p className="cart__item-store">{item.loja}</p>
                            <p className="cart__item-price">{item.preco}</p>
                            {item.sabores && (
                              <p className="cart__item-flavors">
                                Sabores:{" "}
                                {Object.entries(item.sabores)
                                  .map(([sabor, qtd]) => `${sabor} (${qtd})`)
                                  .join(", ")}
                              </p>
                            )}
                          </div>
                          <div className="cart__item-qty">
                            <button onClick={() => decreaseQty(index)}>-</button>
                            <span>{item.qty}</span>
                            <button onClick={() => increaseQty(index)}>+</button>
                          </div>
                          <button
                            className="cart__item-remove"
                            onClick={() => removeFromCart(index)}
                          >
                            Remover
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="cart__total-items">Itens: {totalItems}</p>

          <div className="cart__total">
            <strong>Total:</strong>
            <strong>{formatBRL(totalPrice)}</strong>
          </div>

          <div className="cart__actions">
            <button onClick={clearCart}>Limpar</button>
            <button>Finalizar</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;