import { useOrder } from "../../../../contexts/OrderContext";
import "./Cart.css";
import { formatPrice } from "../../../../utils/formatPrice";
import { useStep } from "../../../../contexts/StepContext";

function Cart({ isCheckout = false }) {
   const { goToPayment } = useStep();
  const {
    order,
    removeProduct,
    updateQuantity,
    clearOrder,
  } = useOrder();

  const items = order?.products || [];

  const itemsPorCategoria = items.reduce((acc, item) => {
    const categoria = item.productId?.categoria || "Outros";
    const sub = item.productId?.subcategoria || "";

    if (!acc[categoria]) acc[categoria] = {};
    if (!acc[categoria][sub]) acc[categoria][sub] = [];

    acc[categoria][sub].push(item);

    return acc;
  }, {});

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = order?.total || 0;

  return (
    <div className="cart__content">

      {isCheckout ? (
        <h2 className="cart__checkout">Pedido</h2>
      ) : (
        <h2 className="cart__title">Seu Carrinho</h2>
      )}

      {items.length === 0 ? (
        <p className="cart__empty">Seu carrinho está vazio.</p>
      ) : (
        <>
          <div className="cart__list">
            {Object.entries(itemsPorCategoria).map(([categoria, subs]) => (
              <div key={categoria} className="cart__category">
                <h3 className="cart__list_category">{categoria}</h3>

                {Object.entries(subs).map(([subcategoria, categoriaItems]) => (
                  <div key={subcategoria} className="cart__subcategory">
                    {subcategoria && <h4>{subcategoria}</h4>}
                    <ul>
                      {categoriaItems.map((item) => (
                        <li
                          key={item.productId._id}
                          className="cart__item"
                        >
                          <img
                            src={item.productId?.foto}
                            alt={item.productId?.nome}
                          />

                          <div className="cart__item-info">
                            <p className="cart__item-name">
                              {item.productId?.nome}
                            </p>

                            <p className="cart__item-price">
                              {formatPrice(item.productId?.preco)}
                            </p>

                            {item.sabores?.length > 0 && (
                              <p className="cart__item-flavors">
                                Sabores: {item.sabores.join(", ")}
                              </p>
                            )}
                          </div>

                          {!isCheckout && (
                            <div className="cart__item-qty">
                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId._id,
                                    item.quantity - 1
                                  )
                                }
                              >
                                -
                              </button>

                              <span>{item.quantity}</span>

                              <button
                                onClick={() =>
                                  updateQuantity(
                                    item.productId._id,
                                    item.quantity + 1
                                  )
                                }
                              >
                                +
                              </button>
                            </div>
                          )}

                          {!isCheckout && (
                            <button
                              className="cart__item-remove"
                              onClick={() =>
                                removeProduct(item.productId._id)
                              }
                            >
                              Remover
                            </button>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <p className="cart__total-items">
            Itens: {totalItems}
          </p>

          <div className="cart__total">
            <strong>Total:</strong>
            <strong>{formatPrice(totalPrice)}</strong>
          </div>

          {!isCheckout && (
            <div className="cart__actions">
              <button onClick={clearOrder}>Limpar</button>
              <button  onClick={goToPayment}>Finalizar</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Cart;