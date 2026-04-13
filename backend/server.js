import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import app from "./app.js";



const PORT = process.env.PORT || 5000;

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