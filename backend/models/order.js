import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  dataEvento: { type: Date, required: true },
  horaInicio: { type: String, required: true },
  duracao: { type: Number, required: true },
  tipoEvento: { type: String, required: true },
  tipoPersonalizado: { type: String },
  local: { type: String, required: true },
  convidados: { type: Number, required: true },
  carrinho: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantidade: { type: Number, default: 1 },
      preco: { type: Number, required: true },
      sabores: [{ type: String }],
    },
  ],
  total: { type: Number, default: 0 },
  status: { type: String, default: "iniciado" }, // iniciado, pago, cancelado
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);

export default Order;