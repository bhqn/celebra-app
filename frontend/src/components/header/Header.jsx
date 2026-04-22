import "./Header.css";
import Logo from "../../assets/logo.png";
import Popup from "../popup/popup"
import { useNavigate } from "react-router-dom";
import { useOrder } from "../../contexts/OrderContext";

function Header({onOpen}) {
  const { resetOrder } = useOrder();
  const navigate = useNavigate();

  const handleLogout = () => {
    resetOrder();
    localStorage.removeItem("token"); 
    localStorage.removeItem("user");
    navigate("/login", { replace: true }); 
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <>
      <div className="header">
        <img src={Logo} className="logo" alt="Logo" />
        <div className="menu">
         
        <p className="menu__btn"  onClick={() => onOpen(null)}>Carrinho</p>
        <p className="menu__btn" onClick={handleLogout}>Sair</p>
        </div>
      </div>
    </>
  );
}

export default Header;
