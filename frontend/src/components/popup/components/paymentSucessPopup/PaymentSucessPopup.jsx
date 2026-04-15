export default function PaymentSuccessContent({ onClose }) {
  return (
    <div className="success__content">
      <h2>Pagamento confirmado 🎉</h2>
      <p>Seu pedido foi realizado com sucesso!</p>

      <button onClick={onClose}>Fechar</button>
    </div>
  );
}