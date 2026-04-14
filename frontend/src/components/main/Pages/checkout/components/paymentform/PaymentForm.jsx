import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

import "./PaymentForm.css";
import { useOrder } from "../../../../../../contexts/OrderContext";
import { useStep } from "../../../../../../contexts/StepContext";
import { api } from "../../../../../../services/api";

function PaymentForm({ onConfirm, setPaymentLoading }) {
  const stripe = useStripe();
  const elements = useElements();

  const [form, setForm] = useState({
    name: "",
    cpf: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { order, resetOrder } = useOrder();
  const { setCurrentStep } = useStep();
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "cpf") {
      const masked = value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2")
        .slice(0, 14);
      return setForm((prev) => ({ ...prev, cpf: masked }));
    }

    if (name === "phone") {
      const masked = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d{1,4})$/, "$1-$2")
        .slice(0, 15);
      return setForm((prev) => ({ ...prev, phone: masked }));
    }

    if (name === "zip") {
      const masked = value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d{1,3})$/, "$1-$2")
        .slice(0, 9);
      return setForm((prev) => ({ ...prev, zip: masked }));
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    setPaymentLoading(true);

    const cardElement = elements.getElement(CardElement);

    try {
      const response = await api.post("/api/payment/create-payment-intent", {
        orderId: order._id,
      });

      const { clientSecret } = response.data;

      const { error: stripeError, paymentIntent } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: cardElement,
            billing_details: {
              name: form.name,
              email: form.email,
              phone: form.phone,
              address: {
                line1: form.address,
                city: form.city,
                state: form.state,
                postal_code: form.zip,
                country: "BR",
              },
            },
          },
        });

      setLoading(false);
      setPaymentLoading(false);

      if (stripeError) {
        setError(stripeError.message);
        return;
      }

      if (paymentIntent.status === "succeeded") {
        console.log("Pagamento aprovado 🎉");

        await api.patch(`/order/${order._id}/pay`);
       
        // volta pro step inicial
        setCurrentStep(0);

        resetOrder(); 

        onConfirm?.();
      }
    } catch (err) {
      setLoading(false);
      setPaymentLoading(false);

      console.log("ERRO COMPLETO:", err);
      setError(err.message || "Erro ao processar pagamento");
    }
  };

  return (
    <div className="payment">
      <div className="payment__header">
        <span className="payment__tag">Checkout seguro</span>
        <h1 className="payment__title">Pagamento</h1>
        <p className="payment__subtitle">
          Preencha os dados abaixo para concluir sua compra
        </p>
      </div>

      <form id="payment-form" className="payment__form" onSubmit={handleSubmit}>
        <fieldset className="payment__section">
          <legend className="payment__section-label">Dados pessoais</legend>

          <div className="payment__field">
            <label className="payment__label" htmlFor="name">
              Nome completo
            </label>
            <input
              id="name"
              name="name"
              className="payment__input"
              value={form.name}
              onChange={handleChange}
              placeholder="João da Silva"
              required
              autoComplete="name"
            />
          </div>

          <div className="payment__row">
            <div className="payment__field">
              <label className="payment__label" htmlFor="cpf">
                CPF
              </label>
              <input
                id="cpf"
                name="cpf"
                className="payment__input"
                value={form.cpf}
                onChange={handleChange}
                placeholder="000.000.000-00"
                required
              />
            </div>
            <div className="payment__field">
              <label className="payment__label" htmlFor="phone">
                Telefone
              </label>
              <input
                id="phone"
                name="phone"
                className="payment__input"
                value={form.phone}
                onChange={handleChange}
                placeholder="(11) 91234-5678"
                required
                autoComplete="tel"
              />
            </div>
          </div>

          <div className="payment__field">
            <label className="payment__label" htmlFor="email">
              E-mail
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="payment__input"
              value={form.email}
              onChange={handleChange}
              placeholder="joao@email.com"
              required
              autoComplete="email"
            />
          </div>
        </fieldset>

        <fieldset className="payment__section">
          <legend className="payment__section-label">Endereço</legend>

          <div className="payment__field">
            <label className="payment__label" htmlFor="address">
              Logradouro
            </label>
            <input
              id="address"
              name="address"
              className="payment__input"
              value={form.address}
              onChange={handleChange}
              placeholder="Rua das Flores, 123"
              required
              autoComplete="street-address"
            />
          </div>

          <div className="payment__row payment__row--thirds">
            <div className="payment__field">
              <label className="payment__label" htmlFor="zip">
                CEP
              </label>
              <input
                id="zip"
                name="zip"
                className="payment__input"
                value={form.zip}
                onChange={handleChange}
                placeholder="00000-000"
                required
              />
            </div>
            <div className="payment__field payment__field--grow">
              <label className="payment__label" htmlFor="city">
                Cidade
              </label>
              <input
                id="city"
                name="city"
                className="payment__input"
                value={form.city}
                onChange={handleChange}
                placeholder="São Paulo"
                required
                autoComplete="address-level2"
              />
            </div>
            <div className="payment__field payment__field--short">
              <label className="payment__label" htmlFor="state">
                UF
              </label>
              <input
                id="state"
                name="state"
                className="payment__input payment__input--center"
                value={form.state}
                onChange={handleChange}
                placeholder="SP"
                maxLength={2}
                required
                autoComplete="address-level1"
              />
            </div>
          </div>
        </fieldset>

        <fieldset className="payment__section">
          <legend className="payment__section-label">Cartão de crédito</legend>

          <div className="payment__field">
            <label className="payment__label">Dados do cartão</label>
            <div className="payment__card-wrapper">
              <CardElement
                options={{
                  style: {
                    base: {
                      fontSize: "14px",
                      fontFamily: "'DM Sans', sans-serif",
                      color: "#1a1a1a",
                      "::placeholder": { color: "#aaa" },
                    },
                    invalid: { color: "#e53e3e" },
                  },
                }}
              />
            </div>
          </div>
        </fieldset>

        {error && <p className="payment__error">{error}</p>}

        <p className="payment__secure">
          Pagamento processado com segurança pelo Stripe
        </p>
      </form>
    </div>
  );
}

export default PaymentForm;
