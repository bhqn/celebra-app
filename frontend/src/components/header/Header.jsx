import "./Header.css";
import Logo from "../../assets/logo.png";
import Popup from "../popup/popup"

function Header({onOpen}) {
  return (
    <>
      <div className="header">
        <img src={Logo} className="logo" alt="Logo" />
        <div className="menu">
        <p className="menu__btn">Configurações</p>
        <p className="menu__btn"  onClick={() => onOpen(null)}>Carrinho</p>
        <p className="menu__btn">Sair</p>
        </div>
      </div>
    </>
  );
}

export default Header;
