import { useState } from "react";
import Stepper from "./components/Stepper/Stepper";
import Food from "./Pages/food/food";
import Drinks from "./Pages/drinks/drinks";
import Struct from "./Pages/estrutura/Struct";
import Fun from "./Pages/entreterimento/fun";
import Info from "./Pages/informacoes/Info";
import "./Main.css";
import "./components/Stepper/Stepper.css";

export default function Main() {
  const [currentStep, setCurrentStep] = useState(0);

  const next = () => {
    console.log("Avançando do step", currentStep);
    setCurrentStep((s) => Math.min(s + 1, steps.length - 1));
  };

  const back = () => setCurrentStep((s) => Math.max(s - 1, 0));

  const steps = [
    { key: "info", label: "Informações", element: <Info next={next} /> },
    { key: "food", label: "Comidas", element: <Food /> },
    { key: "drink", label: "Bebidas", element: <Drinks /> },
    { key: "struct", label: "Estrutura", element: <Struct /> },
    { key: "fun", label: "Entretenimento", element: <Fun /> },
    {
      key: "pay",
      label: "Pagamento",
      element: <div />,
      customClass: "stepper__label--ajustado",
    },
  ];

  return (
    <div className="main__wizard">
      <Stepper steps={steps} currentStep={currentStep} />

      <div className="main__content">
        {steps[currentStep].element}
      </div>

      <div className="main__actions">
        {currentStep !== 0 && (
          <button
            className="main__back_btn"
            type="button"
            onClick={back}
          >
            Voltar
          </button>
        )}

        <button
          className="main__next_btn"
          type={currentStep === 0 ? "submit" : "button"}
          form={currentStep === 0 ? "info-form" : undefined}
          onClick={currentStep !== 0 ? next : undefined}
          disabled={currentStep === steps.length - 1}
        >
          Próximo
        </button>
      </div>
    </div>
  );
}