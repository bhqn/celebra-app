import { useState } from "react";
import "./Info.css";
import { useForm } from "react-hook-form";

function Info({ next }) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [location, setLocation] = useState("");
  const convidados = watch("convidados", 50);

  function usarLocalizacaoAtual() {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada no navegador");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation(`Lat: ${latitude}, Long: ${longitude}`);
      },
      () => {
        alert("Não foi possível obter a localização");
      },
    );
  }

  function onSubmit(data) {
    console.log("Dados do formulário:", data);
    next();
  }

  return (
    <div className="info">
      <form id="info-form" className="info__form" onSubmit={handleSubmit(onSubmit)}>
        <p>Quando será o evento?</p>
        <input
          type="date"
          {...register("dataEvento", {
            required: "A data é obrigatória",
          })}
        />
        {errors.dataEvento && <span>{errors.dataEvento.message}</span>}

        <div className="info__time">
          <p>Início</p>
          <input type="time" {...register("horaInicio", { required: true })} />

          <p>Previsão (horas)</p>
          <input className="info__time_input" type="number" min="1" max="10" />
        </div>

        <p>Onde será o evento?</p>
        <input
          type="text"
          value={location}
          {...register("local", { required: true })}
          onChange={(e) => setLocation(e.target.value)}
        />

        <button
          className="info__btn_location"
          type="button"
          onClick={usarLocalizacaoAtual}
        >
          Usar localização atual
        </button>

        <p>Número aproximado de convidados?</p>
        {/* Range / radius */}
        <input type="range" min="1" max="500" {...register("convidados")} />
        <p>{convidados} convidados</p>
      </form>
    </div>
  );
}

export default Info;
