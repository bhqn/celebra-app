import { useOrder } from "../../../../contexts/OrderContext";
import "./partySummary.css"

export default function PartySummary({ onEdit }) {
    const { order, loading } = useOrder();

    if (loading) return <p>Carregando resumo...</p>;
    if (!order) return <p>Nenhum pedido ativo</p>;


 return (
    <div className="party-summary">
        <div className="party__content">
      <h3 className="party__title">Resumo do evento</h3>
      <p className="party__btn" onClick={onEdit}>Editar</p>
      </div>
<ul className="party__list">
      <li className="party__info">Data: {order.dataEvento}</li>
      <li className="party__info">Hora: {order.horaInicio}</li>
      <li className="party__info">Duração: {order.duracao}H</li>
      <li className="party__info">Tipo: {order.tipoEvento}</li>
      <li className="party__info">Local: {order.local}</li>
      <li className="party__info">N° de convidados: {order.convidados}</li>
      </ul>
      
    </div>
  );
}
