import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../../services/auth";
import { api } from "../../services/api";
import "./login.css";

function Login() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
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
      // 1. LOGIN
      const res = await login(form);

      const token = res.data.token;

      localStorage.setItem("token", token);

      // seta token no axios
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // 2. ORDER
      try {
        const orderRes = await api.get("/order/current");
        localStorage.setItem("orderId", orderRes.data._id);
      } catch (err) {
        if (err.response?.status !== 404) {
          throw err;
        }
        // sem pedido iniciado no momento, segue normalmente
      }

      navigate("/");
    } catch (err) {
      console.log(err.response?.data);

  const validation = err.response?.data?.validation?.body;

  const field = validation?.keys?.[0];
  const message =
    validation?.message || err.response?.data?.message;

  setErrors({
    email: field === "email" ? message : "",
    password: field === "password" ? message : "",
    general: !field ? message : "",
  });
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
          {errors.email && <span className="login__error">{errors.email}</span>}

          <input
            className="login__input"
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
          />
          {errors.password && (
            <span className="login__error">{errors.password}</span>
          )}
              {errors.general && (
  <span className="login__error">{errors.general}</span>
)}

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
