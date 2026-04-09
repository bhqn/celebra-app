import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth";
import "./login.css";
import { Link } from "react-router-dom";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  // Atualiza os inputs
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  // Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await login(form);


    console.log("RESPOSTA COMPLETA:", res.data);
    console.log("TOKEN JWT:", res.data.token);
    console.log("USUÁRIO:", res.data.user);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");

      alert("Login realizado!");
    } catch (err) {
      alert(err.response?.data?.message || "Erro no login");
    }
  };

  return (
    <div className="login">
      <div className="login__container">
        <h2 className="login__title">Login</h2>

        <form className="login__form" onSubmit={handleSubmit}>
          <input
            className="login__input"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            className="login__input"
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
          />

          <button className="login__button" type="submit">
            Entrar
          </button>
          <p className="login__text">
            Não tem conta?{" "}
            <Link to="/register" className="login__link">
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
