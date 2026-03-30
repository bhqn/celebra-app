import Cart from "../../../popup/components/cart/Cart";

function Checkout(){
    return (<>
    
<div className="checkout__cart" >
    <Cart isCheckout />
</div>
<div className="checkout__payment"></div>
    </>)

}
export default Checkout;