import { useState } from "react";
import Stepper from "./components/Stepper/Stepper";
import Food from "./Pages/food/Food";
import Drinks from "./Pages/drinks/Drinks";
import Struct from "./Pages/estrutura/Struct";
import Fun from "./Pages/entreterimento/Fun";
import Info from "./Pages/informacoes/Info";
import "./Main.css";
import "./components/Stepper/Stepper.css";
import Checkout from "./Pages/checkout/checkout.jsx";
import { useEffect } from "react";
import { api } from "../../services/api.js";
import PartySummary from "./Pages/checkout/components/partySummary/PartySummary.jsx";
import { useStep } from "../../contexts/StepContext";


export default function Main({ onOpen, onSuccess }) {
  const { currentStep, setCurrentStep } = useStep();
  const [loading, setLoading] = useState(true);
  const [paymentLoading, setPaymentLoading] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const res = await api.get("/order/current");

        if (res.data) {
          // existe order iniciado
          setCurrentStep(1); // step 1 (Informações)
        }
      } catch (err) {
        console.log("Sem order ativa");
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, []);

  if (loading) return <p>Carregando...</p>;

  const next = () => {
    console.log("Avançando do step", currentStep);
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const steps = [
    { key: "info", label: "Informações", element: <Info next={next} /> },
    { key: "food", label: "Comidas", element: <Food onOpen={onOpen} /> },
    { key: "drink", label: "Bebidas", element: <Drinks onOpen={onOpen} /> },
    { key: "struct", label: "Estrutura", element: <Struct onOpen={onOpen} /> },
    { key: "fun", label: "Entretenimento", element: <Fun onOpen={onOpen} /> },
    {
      key: "pay",
      label: "Pagamento",
      element: (
        <Checkout
          onSuccess={onSuccess}
          setPaymentLoading={setPaymentLoading}
          onEdit={() => setCurrentStep(0)}
        />
      ),
      customClass: "stepper__label--ajustado",
    },
  ];

  const goToPayment = () => {
    const payIndex = steps.findIndex((step) => step.key === "pay");
    setCurrentStep(payIndex);
  };

  const isLastStep = currentStep === steps.length - 1;

  return (
    <div className="main__wizard">
      <Stepper steps={steps} currentStep={currentStep} />

      <div className="main__content">{steps[currentStep].element}</div>

      <div className="main__actions">
        {currentStep !== 0 && (
          <button className="main__back_btn" type="button" onClick={back}>
            Voltar
          </button>
        )}

        {!isLastStep && (
          <button
            className="main__next_btn"
            type={currentStep === 0 ? "submit" : "button"}
            form={currentStep === 0 ? "info-form" : undefined}
            onClick={currentStep !== 0 ? next : undefined}
          >
            Próximo
          </button>
        )}

        {isLastStep && (
          <button
            className="main__next_btn"
            type="submit"
            form="payment-form"
            disabled={paymentLoading}
          >
            {paymentLoading ? "Processando..." : "Pagar agora"}
          </button>
        )}
      </div>
    </div>
  );
}
