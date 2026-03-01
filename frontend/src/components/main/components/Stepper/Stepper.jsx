
import "./Stepper.css"
export default function Stepper({ steps, currentStep }) {
  return (
    <div className="stepper">
      <div className="stepper__track">
        {steps.map((s, idx) => {
          const state =
            idx < currentStep ? "done" : idx === currentStep ? "active" : "todo";

          return (
            <div className="stepper__item" key={s.key}>
              <div className={`stepper__circle stepper__circle--${state}`}>
                {state === "done" ? "✓" : ""}
              </div>
               <div
                className={`stepper__label stepper__label--${state} ${
                  s.customClass ? s.customClass : ""
                }`}
              >
                {s.label}
              </div>

              {idx !== steps.length - 1 && (
                <div className={`stepper__line stepper__line--${state}`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}