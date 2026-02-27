import { useState } from "react";
import Stepper from "./components/Stepper/Stepper";
import Card from "../main/components/card/Card"
import CategoryCarousel from "./components/CategoryCarousel/CategoryCarousel";
import Food from "./Pages/food/food";

export default function Main() {
  const steps = [
    { key: "info", label: "Informações", element: <div>Form Info</div> },
    {
      key: "food",
      label: "Comidas",
      element: (
    <Food/>
      ),
    },
    { key: "drink", label: "Bebidas", element: <div>Form Bebidas</div> },
    { key: "struct", label: "Estrutura", element: <div>Form Estrutura</div> },
    {
      key: "fun",
      label: "Entretenimento",
      element: <div>Form Entretenimento</div>,
    },
    { key: "pay", label: "Pagamento", element: <div>Form Pagamento</div> },
  ];

  const [currentStep, setCurrentStep] = useState(0);

  const next = () => setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));

  return (
    <div className="wizard">
      <Stepper steps={steps} currentStep={currentStep} />

      <div className="wizard__content">{steps[currentStep].element}</div>

      <div className="wizard__actions">
        <button onClick={back} disabled={currentStep === 0}>
          Voltar
        </button>
        <button onClick={next} disabled={currentStep === steps.length - 1}>
          Próximo
        </button>
      </div>
    </div>
  );
}
