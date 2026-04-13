import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "../Header/Header";
import Main from "../Main/Main";
import Popup from "../popup/popup";
import PopupIten from "../popup/components/popupIten/PopupIten";
import Cart from "../popup/components/cart/Cart";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Login from "../login/Login";
import Register from "../register/Register";
import PrivateRoute from "../PrivateRoute";
import { OrderProvider } from "../../contexts/OrderContext";
import { api } from "../../services/api";

import "./App.css";

const stripePromise = loadStripe(
  import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY
);

console.log(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function App() {
  const [selectedItem, setSelectedItem] = useState(null);
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
  };

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    api.get("/order/current").then((res) => {
      localStorage.setItem("orderId", res.data._id);
    });
  }
}, []);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && closePopup();
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, []);

  return (
    <BrowserRouter>
      <Routes>

        {/* públicas */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* privada */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <OrderProvider> 
                <Elements stripe={stripePromise}>
                  <Header onOpen={openPopup} onOpenCart={openCart} />
                  <Main onOpen={openPopup} />

                  {isOpen && (
                    <Popup onClose={closePopup}>
                      {selectedItem ? (
                        <PopupIten {...selectedItem} onClose={closePopup} />
                      ) : (
                        <Cart />
                      )}
                    </Popup>
                  )}
                </Elements>
              </OrderProvider>
            </PrivateRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;