import "./Header.css";
import Logo from "../../assets/logo.png";

function Header() {
  return (
    <>
      <div className="header">
        <img src={Logo} className="logo" alt="Logo" />
        <div className="menu">
        <p className="menu__btn">Configurações</p>
        <p className="menu__btn">Sair</p>
        </div>
      </div>
    </>
  );
}

export default Header;
