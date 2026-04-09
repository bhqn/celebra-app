import { useState } from "react";
import "./Info.css";
import { useForm } from "react-hook-form";
import { useOrder } from "../../../../contexts/OrderContext";

const EVENT_TYPES = [
  { label: "Aniversário",      value: "Aniversário" },
  { label: "Casamento",        value: "Casamento" },
  { label: "Formatura",        value: "Formatura" },
  { label: "Corporativo",      value: "Corporativo" },
  { label: "Confraternização", value: "Confraternização" },
  { label: "+ Outro",             value: "outro" },
];

function Info({ next }) {
  const { createOrder, orderId } = useOrder();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm();

  const [location, setLocation] = useState("");
  const convidados = watch("convidados", 50);
  const selectedType = watch("tipoEvento");

  function usarLocalizacaoAtual() {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada no navegador");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        const loc = `Lat: ${latitude.toFixed(5)}, Long: ${longitude.toFixed(5)}`;
        setLocation(loc);
        setValue("local", loc);
      },
      () => {
        alert("Não foi possível obter a localização");
      }
    );
  }

  async function onSubmit(data) {
    const finalType =
      data.tipoEvento === "outro" ? data.tipoPersonalizado : data.tipoEvento;

    const orderData = {
      ...data,
      tipoEvento: finalType,
      products: [],
      total: 0,
    };

    if (!orderId) {
      const createdOrder = await createOrder(orderData);
      if (!createdOrder) {
        return;
      }
    }

    next();
  }

  return (
    <div className="info">
      <form
        id="info-form"
        className="info__form"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="info__header">
          <h2>Detalhes do evento</h2>
          <p>Preencha as informações abaixo</p>
        </div>

        {/* Data */}
        <div className="info__field">
          <label>Data do evento</label>
          <input
            type="date"
            {...register("dataEvento", { required: "A data é obrigatória" })}
          />
          {errors.dataEvento && (
            <span className="info__error">{errors.dataEvento.message}</span>
          )}
        </div>

        {/* Horário */}
        <div className="info__time">
          <div className="info__field">
            <label>Início</label>
            <input
              type="time"
              {...register("horaInicio", { required: true })}
            />
          </div>
          <div className="info__field">
            <label>Duração (horas)</label>
            <input
              type="number"
              min="1"
              max="10"
              defaultValue={3}
              {...register("duracao")}
            />
          </div>
        </div>

        <hr className="info__divider" />

        {/* Tipo de evento — chips */}
        <div className="info__field">
          <label>Tipo de evento</label>
          <input
            type="hidden"
            {...register("tipoEvento", { required: "Selecione um tipo de evento" })}
          />
          <div className="info__chips">
            {EVENT_TYPES.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                className={`info__chip ${selectedType === value ? "info__chip--active" : ""}`}
                onClick={() => setValue("tipoEvento", value, { shouldValidate: true })}
              >
                {label}
              </button>
            ))}
          </div>
          {errors.tipoEvento && (
            <span className="info__error">{errors.tipoEvento.message}</span>
          )}

          {/* Campo extra para "Outro" */}
          <div className={`info__custom-wrap ${selectedType === "outro" ? "info__custom-wrap--visible" : ""}`}>
            <input
              type="text"
              placeholder="Qual tipo de evento?"
              {...register("tipoPersonalizado", {
                required: selectedType === "outro" ? "Descreva o tipo de evento" : false,
              })}
            />
            {errors.tipoPersonalizado && (
              <span className="info__error">{errors.tipoPersonalizado.message}</span>
            )}
          </div>
        </div>

        <hr className="info__divider" />

        {/* Local */}
        <div className="info__field">
          <label>Local</label>
          <div className="info__location-wrap">
            <input
              type="text"
              placeholder="Endereço ou lugar"
              value={location}
              {...register("local", { required: true })}
              onChange={(e) => {
                setLocation(e.target.value);
                setValue("local", e.target.value, { shouldValidate: true });
              }}
            />
            <button
              className="info__location-icon-btn"
              type="button"
              onClick={usarLocalizacaoAtual}
              title="Usar localização atual"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="3" />
                <path d="M12 2v3M12 19v3M2 12h3M19 12h3" />
              </svg>
            </button>
          </div>
          <button
            className="info__btn_location"
            type="button"
            onClick={usarLocalizacaoAtual}
          >
            Usar localização atual
          </button>
        </div>

        <hr className="info__divider" />

        {/* Convidados */}
        <div className="info__field">
          <label>Número de convidados</label>
          <div className="info__slider-row">
            <input
              type="range"
              min="1"
              max="500"
              step="1"
              defaultValue={50}
              {...register("convidados")}
            />
            <span className="info__slider-value">{convidados}</span>
          </div>
        </div>

      </form>
    </div>
  );
}

export default Info;