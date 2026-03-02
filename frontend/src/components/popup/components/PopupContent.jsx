import Star from "../../../assets/star.svg";
import "./PopupContent.css";
export default function PopupContent({ nome, foto, preco, avaliacao, loja }) {
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
          <p className="modal__rate">{avaliacao} </p>
          <img src={Star} />
        </div>
         
        

       
      </div>
      <div className="modal_wrap_two">
        <div>
        <p className="modal__title modal__title-desc">Descrição</p>
        <p className="modal__description">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
        </div>
        <button className="modal__btn">Adicionar ao carrinho</button>
      </div>
    </div>
  );
}
