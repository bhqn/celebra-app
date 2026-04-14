// contexts/StepContext.js
import { createContext, useContext, useState } from "react";

const StepContext = createContext();

export function StepProvider({ children }) {
  const [currentStep, setCurrentStep] = useState(0);

  // 🔥 mapa de steps (centralizado)
  const stepKeys = ["info", "food", "drink", "struct", "fun", "pay"];

  const goToStep = (key) => {
    const index = stepKeys.indexOf(key);
    if (index !== -1) {
      setCurrentStep(index);
    }
  };

  const goToPayment = () => {
    goToStep("pay");
  };

  return (
    <StepContext.Provider
      value={{
        currentStep,
        setCurrentStep,
        goToStep,
        goToPayment,
      }}
    >
      {children}
    </StepContext.Provider>
  );
}

export function useStep() {
  return useContext(StepContext);
}