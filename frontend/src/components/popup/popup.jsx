import PopupContent from "./components/PopupContent"
import "./popup.css"
import close from "../../assets/close.svg"


function Popup({ item, onClose }) {
  return (
    <div className="Popup__background"
     
      onClick={onClose} // fecha clicando fora
    >
      <div className="popup__content"
        style={{
          backgroundColor: "#fff",
          padding: "24px",
          borderRadius: "8px",
          minWidth: "300px",
        }}
        onClick={(e) => e.stopPropagation()} // impede fechar ao clicar dentro
      >
        
        <img className = "popup__close" onClick={onClose} src={close} alt="closebtn" />
        <PopupContent {...item}/>
        

       
      </div>
       
    </div>
  );
}

export default Popup;