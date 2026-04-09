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

  products: {
    type: [
      {
        nome:{
          type: String
        } ,
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
        },
        sabores: [{ type: String }],
      },
    ],
    default: [],
  },

  total: { type: Number, default: 0 },

  status: {
    type: String,
    enum: ["iniciado", "pago", "cancelado"],
    default: "iniciado",
  },
}, { timestamps: true });
const Order = mongoose.model("Order", orderSchema);

export default Order;

