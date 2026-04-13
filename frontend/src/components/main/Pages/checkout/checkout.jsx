import Cart from "../../../popup/components/cart/Cart";
import PaymentForm from "./components/paymentform/PaymentForm";
import "./checkout.css";

function Checkout({ onConfirm, setPaymentLoading }) {
  return (
    <div className="checkout__content">
      <div className="checkout__cart">
        <Cart isCheckout />
      </div>
      <div className="checkout__payment">
        <PaymentForm
          onConfirm={onConfirm}
          setPaymentLoading={setPaymentLoading}
        />
      </div>
    </div>
  );
}
export default Checkout;
