import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Popup from "../popup/popup";
import PopupIten from "../popup/components/popupIten/PopupIten"
import Cart from "../popup/components/cart/Cart";

import "./App.css";

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
  // estado: ui
  const [isOpen, setIsOpen] = useState(false);

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
      <Header onOpen={openPopup} />
      <Main onOpen={openPopup} />
      {isOpen && (
  <Popup onClose={closePopup}>
    {selectedItem ? (
      <PopupIten {...selectedItem} />
    ) : (
      <Cart /> // carrinho vazio
    )}
  </Popup>
)}
    </>
  );
}

export default App;
