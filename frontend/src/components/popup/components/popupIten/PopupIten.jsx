import Star from "../../../../assets/star.svg";
import "./PopupIten.css";
import { useCart } from "../../../../contexts/useCart";

export default function PopupContent({ id, nome, foto, preco, avaliacao, loja, onClose }) {
  const { addToCart } = useCart();

  const handleAdd = () => {
    addToCart({ id, nome, foto, preco, avaliacao, loja });
    onClose()
    
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
          <p className="modal__description">...</p>
        </div>

        <button className="modal__btn" onClick={handleAdd}>
          Adicionar ao carrinho
        </button>
      </div>
    </div>
  );
}