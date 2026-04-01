import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  descricao: { type: String },

  categoria: { type: String, required: true },
  subcategoria: { type: String },

  preco: { type: Number, required: true },

  avaliacao: { type: Number, default: 0 },

  loja: { type: String },
  foto: { type: String },

  sabores: [{ type: String }],

  tipo: {
    type: String,
    enum: ["produto", "serviço", "aluguel"],
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Product", ProductSchema);