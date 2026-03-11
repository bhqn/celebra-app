import Star from "../../../../assets/star.svg";
import "./PopupIten.css";
import { useCart } from "../../../../contexts/useCart";
import { useState } from "react";

export default function PopupContent({
  id,
  nome,
  foto,
  preco,
  avaliacao,
  loja,
  descricao,
  sabores,
  onClose,
}) {
  const { addToCart } = useCart();

  const LIMITE_SABORES = 2;

  const [saboresSelecionados, setSaboresSelecionados] = useState({});
  const [quantidade, setQuantidade] = useState(1);

  const aumentarQtd = () => {
    setQuantidade((prev) => prev + 1);
  };

  const diminuirQtd = () => {
    setQuantidade((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const totalSelecionado = Object.values(saboresSelecionados).reduce(
    (acc, val) => acc + val,
    0,
  );

  const addSabor = (sabor) => {
    if (totalSelecionado >= LIMITE_SABORES) return;

    setSaboresSelecionados((prev) => ({
      ...prev,
      [sabor]: (prev[sabor] || 0) + 1,
    }));
  };

  const removeSabor = (sabor) => {
    setSaboresSelecionados((prev) => {
      const quantidade = (prev[sabor] || 0) - 1;

      if (quantidade <= 0) {
        const novo = { ...prev };
        delete novo[sabor];
        return novo;
      }

      return {
        ...prev,
        [sabor]: quantidade,
      };
    });
  };

  const handleAdd = () => {
    if (sabores?.length > 0 && totalSelecionado !== LIMITE_SABORES) {
      return;
    }

    addToCart({
      id,
      nome,
      foto,
      preco,
      avaliacao,
      loja,
      sabores: saboresSelecionados,
      quantidade,
    });

    onClose();
  };

  return (
    <div className="modal__content">
      <div className="modal__warp_one">
        <img className="modal__image" src={foto} alt={nome} />

        <p className="modal__title">{nome}</p>

        <div className="modal__wrap">
          <p className="modal__store">{loja}</p>
          <p className="modal__price">{preco}</p>
        </div>

        <div className="modal__review">
          <p className="modal__rate">{avaliacao}</p>
          <img src={Star} alt="star" />
        </div>
      </div>

      <div className="modal_wrap_two">
        <div>
          <p className="modal__title modal__title-desc">Descrição</p>

          <p className="modal__description">{descricao}</p>
          

        {sabores?.length > 0 && (
  <>
    <div className="modal__flavors_header">
      <p>Escolha os sabores</p>
      <span>
        {totalSelecionado}/{LIMITE_SABORES}
      </span>
    </div>

    <div className="modal__flavors">
      {sabores.map((sabor) => {
        const quantidade = saboresSelecionados[sabor] || 0;

        return (
          <div key={sabor} className="modal__flavor_row">
            <span>{sabor}</span>

            {quantidade === 0 ? (
              <button
                className="flavor_add"
                onClick={() => addSabor(sabor)}
              >
                +
              </button>
            ) : (
              <div className="flavor_counter">
                <button onClick={() => removeSabor(sabor)}>-</button>
                <span>{quantidade}</span>
                <button onClick={() => addSabor(sabor)}>+</button>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </>
)}
        </div>

        <div className="modal__actions">
          <div className="quantity_selector">
            <button onClick={diminuirQtd}>-</button>

            <span>{quantidade}</span>

            <button onClick={aumentarQtd}>+</button>
          </div>

          <button
            className="modal__btn"
            onClick={handleAdd}
            disabled={
              sabores?.length > 0 && totalSelecionado !== LIMITE_SABORES
            }
          >
            Adicionar ao carrinho
          </button>
        </div>
      </div>
    </div>
  );
}
