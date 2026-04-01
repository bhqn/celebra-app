import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import userRoutes from "./routes/userRoutes.js";
import productsRoute from "./routes/productsRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
dotenv.config();

const app = express();

// 🔓 Middlewares
app.use(cors());
app.use(express.json());

// 📌 Rotas
app.use("/user", userRoutes);
app.use("/products", productsRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

// 🌐 Rota teste
app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

// 🚀 Porta
const PORT = process.env.PORT || 5000;

// 🔌 Conecta no Mongo e só depois sobe o servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB conectado 💥");

    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });

  })
  .catch((err) => {
    console.error("Erro ao conectar no Mongo:", err);
  });