import { useState } from "react";
import { register } from "../../services/auth";
import "./register.css";
import { useNavigate } from "react-router-dom";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    street: "",
    number: "",
    neighborhood: "",
    city: "",
    state: "",
    zipCode: "",
    complement: "",
  });

  // Atualiza os campos
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
      const res = await register({
        name: form.name,
        email: form.email,
        password: form.password,
        address: {
          street: form.street,
          number: form.number,
          neighborhood: form.neighborhood,
          city: form.city,
          state: form.state,
          zipCode: form.zipCode,
          complement: form.complement,
        },
      });

      localStorage.setItem("token", res.data.token);
      navigate("/login")

      alert("Cadastrado com endereço!");
    } catch (err) {
      alert(err.response?.data?.message || "Erro no cadastro");
    }
  };

  return (
    <div className="register">
      <div className="register__container">
        <h2 className="register__title">Cadastro</h2>

        <form className="register__form" onSubmit={handleSubmit}>
          <input
            className="register__input"
            name="name"
            placeholder="Nome"
            value={form.name}
            onChange={handleChange}
          />

          <input
            className="register__input"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
          />

          <input
            className="register__input"
            type="password"
            name="password"
            placeholder="Senha"
            value={form.password}
            onChange={handleChange}
          />

          <div className="register__section">
            <h3 className="register__subtitle">Endereço</h3>

            <input
              className="register__input"
              name="street"
              placeholder="Rua"
              value={form.street}
              onChange={handleChange}
            />

            <input
              className="register__input"
              name="number"
              placeholder="Número"
              value={form.number}
              onChange={handleChange}
            />

            <input
              className="register__input"
              name="neighborhood"
              placeholder="Bairro"
              value={form.neighborhood}
              onChange={handleChange}
            />

            <input
              className="register__input"
              name="city"
              placeholder="Cidade"
              value={form.city}
              onChange={handleChange}
            />

            <input
              className="register__input"
              name="state"
              placeholder="Estado"
              value={form.state}
              onChange={handleChange}
            />

            <input
              className="register__input"
              name="zipCode"
              placeholder="CEP"
              value={form.zipCode}
              onChange={handleChange}
            />

            <input
              className="register__input"
              name="complement"
              placeholder="Complemento"
              value={form.complement}
              onChange={handleChange}
            />
          </div>

          <button className="register__button" type="submit">
            Cadastrar
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;