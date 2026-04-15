import { useState, useEffect } from "react";
import "./Info.css"
import { useForm, Controller } from "react-hook-form";
import { useOrder } from "../../../../contexts/OrderContext";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EVENT_TYPES = [
  { label: "Aniversário", value: "Aniversário" },
  { label: "Casamento", value: "Casamento" },
  { label: "Formatura", value: "Formatura" },
  { label: "Corporativo", value: "Corporativo" },
  { label: "Confraternização", value: "Confraternização" },
  { label: "+ Outro", value: "outro" },
];

function Info({ next }) {
  const { createOrder, orderId, order, updateOrder } = useOrder();

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [location, setLocation] = useState("");

  const convidados = watch("convidados", 50);
  const selectedType = watch("tipoEvento");

  useEffect(() => {
    if (!order) return;

    setValue("dataEvento", order.dataEvento ? new Date(order.dataEvento) : null);
    setValue("horaInicio", order.horaInicio);
    setValue("duracao", order.duracao);
    setValue("tipoEvento", order.tipoEvento);
    setValue("local", order.local);
    setValue("convidados", order.convidados);

    setLocation(order.local || "");
  }, [order, setValue]);

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
        setValue("local", loc, { shouldValidate: true });
      },
      () => {
        alert("Não foi possível obter a localização");
      }
    );
  }

  const hoje = new Date();
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  async function onSubmit(data) {
    const finalType =
      data.tipoEvento === "outro"
        ? data.tipoPersonalizado
        : data.tipoEvento;

    const orderData = {
      ...data,
      tipoEvento: finalType,
    };

    try {
      if (!orderId) {
        const createdOrder = await createOrder({
          ...orderData,
          products: [],
          total: 0,
        });

        if (!createdOrder) return;
      } else {
        await updateOrder(orderId, orderData);
      }

      next();
    } catch (err) {
      console.log("Erro ao salvar order", err);
    }
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

        {/* DATA */}
        <div className="info__field">
          <label>Data do evento</label>

          <Controller
            control={control}
            name="dataEvento"
            rules={{ required: "A data é obrigatória" }}
            render={({ field, fieldState }) => (
              <div>
                <DatePicker
                 calendarClassName="custom-calendar"
                  selected={field.value  ? new Date(field.value) : null} 
                  onChange={(date) => {
                    field.onChange(date);
                    setValue("dataEvento", date, { shouldValidate: true });
                  }}
                  minDate={hoje}
                  maxDate={maxDate}
                  dateFormat="dd/MM/yyyy"
                  placeholderText="data do evento"
                  className="info__datepicker"
                />

                {fieldState.error && (
                  <span className="info__error">
                    {fieldState.error.message}
                  </span>
                )}
              </div>
            )}
          />
        </div>

        {/* HORÁRIO */}
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

        {/* TIPO DE EVENTO */}
        <div className="info__field">
          <label>Tipo de evento</label>

          <input
            type="hidden"
            {...register("tipoEvento", {
              required: "Selecione um tipo de evento",
            })}
          />

          <div className="info__chips">
            {EVENT_TYPES.map(({ label, value }) => (
              <button
                key={value}
                type="button"
                className={`info__chip ${
                  selectedType === value ? "info__chip--active" : ""
                }`}
                onClick={() =>
                  setValue("tipoEvento", value, { shouldValidate: true })
                }
              >
                {label}
              </button>
            ))}
          </div>

          {errors.tipoEvento && (
            <span className="info__error">
              {errors.tipoEvento.message}
            </span>
          )}

          {selectedType === "outro" && (
            <input
              className="info__input_hidden"
              type="text"
              placeholder="Qual tipo de evento?"
              {...register("tipoPersonalizado", {
                required: "Descreva o tipo de evento",
              })}
            />
          )}

          {errors.tipoPersonalizado && (
            <span className="info__error">
              {errors.tipoPersonalizado.message}
            </span>
          )}
        </div>

        <hr className="info__divider" />

        {/* LOCAL */}
        <div className="info__field">
          <label>Local</label>

          <div className="info__location-wrap">
            <input
              type="text"
              placeholder="Endereço ou lugar"
              {...register("local", { required: true })}
              value={location}
              onChange={(e) => {
                setLocation(e.target.value);
                setValue("local", e.target.value, {
                  shouldValidate: true,
                });
              }}
            />

            <button
              type="button"
              onClick={usarLocalizacaoAtual}
              className="info__location-icon-btn"
            >
              📍
            </button>
          </div>
        </div>

        <hr className="info__divider" />

        {/* CONVIDADOS */}
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

            <span className="info__slider-value">
              {convidados}
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Info;