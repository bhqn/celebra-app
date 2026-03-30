import Cart from "../../../popup/components/cart/Cart";
import PaymentForm from "./components/paymentform/PaymentForm";
import "./checkout.css";

function Checkout() {
  return (
    <div className="checkout__content">
      <div className="checkout__cart">
        <Cart isCheckout />
      </div>
      <div className="checkout__payment">
        <PaymentForm />
      </div>
    </div>
  );
}
export default Checkout;
