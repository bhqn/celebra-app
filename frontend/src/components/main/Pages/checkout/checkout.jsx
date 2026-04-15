import Cart from "../../../popup/components/cart/Cart";
import PaymentForm from "./components/paymentform/PaymentForm";
import "./checkout.css";
import PartySummary from "./components/partySummary/PartySummary";


function Checkout({ onSuccess, setPaymentLoading, onEdit }) {
  return (
    <div className="checkout__content">
      <div className="checkout__cart">
        <PartySummary onEdit={onEdit} />
        <Cart isCheckout />
      </div>
      <div className="checkout__payment">
        <PaymentForm
          onSuccess={onSuccess}
          setPaymentLoading={setPaymentLoading}
        />
      </div>
    </div>
  );
}
export default Checkout;
