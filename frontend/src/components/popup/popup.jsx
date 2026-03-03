import PopupContent from "./components/popupIten/PopupIten"
import "./popup.css"
import close from "../../assets/close.svg"


function Popup({ children, onClose }) {
  return (
    <div className="Popup__background" onClick={onClose}>
      <div
        className="popup__content"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          className="popup__close"
          onClick={onClose}
          src={close}
          alt="closebtn"
        />

        {children}
      </div>
    </div>
  );
}

export default Popup;