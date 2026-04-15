import CheckIcon from "../../../../assets/checkIcon.png"
import "./PaymentSuccessPopup.css"

export default function PaymentSuccessContent({ onClose }) {
  return (
    <div className="success__content">
      <div className="payment-success__icon" aria-hidden="true">
        <img className= "payment-success__logo"src={CheckIcon}/>
      </div>

      <p className="payment-success__badge">Pagamento confirmado</p>
      <h2 className="payment-success__title">Pedido realizado!</h2>
      <p className="payment-success__description">
        Seu pagamento foi processado com sucesso.
        <br />
        Em breve você receberá a confirmação por e-mail.
      </p>

      <button onClick={onClose}>Fechar</button>
    </div>
  );
}
