import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Popup from "../popup/popup";
import PopupIten from "../popup/components/popupIten/PopupIten"
import Cart from "../popup/components/cart/Cart";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
const stripePromise = loadStripe("SUA_PUBLIC_KEY");


import "./App.css";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  // estado: ui
  const [isOpen, setIsOpen] = useState(false);

  const openCart = () => {
  setSelectedItem(null);
  setIsOpen(true);
};

  const openPopup = (item) => {
    setSelectedItem(item);
    setIsOpen(true);
  };
  const closePopup = () => {
    setIsOpen(false);
    setSelectedItem(null);
  }

  // ui: fecha popup com ESC
  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && closePopup();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <>
     <Elements stripe={stripePromise}>
      <Header onOpen={openPopup} onOpenCart={openCart}/>
      <Main onOpen={openPopup} />
      
      {isOpen && (
  <Popup onClose={closePopup}>
    {selectedItem ? (
      <PopupIten {...selectedItem} onClose={closePopup} />
    ) : (
      <Cart /> // carrinho vazio
    )}
  </Popup>
)}
</Elements>
    </>
  );
}

export default App;

