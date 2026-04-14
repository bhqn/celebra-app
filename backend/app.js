import express from "express";
import cors from "cors";
import paymentRoutes from "./routes/paymentRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import productsRoute from "./routes/productsRoutes.js";
import { errors } from "celebrate";


import orderRoutes from "./routes/orderRoutes.js";

const app = express();

//  Middlewares
app.use(cors());
app.use(express.json());

//  Rotas
app.use("/auth", userRoutes);
app.use("/products", productsRoute);
app.use("/api/payment", paymentRoutes);

app.use("/order", orderRoutes);

//  Rota teste
app.get("/", (req, res) => {
  res.send("API rodando ");
});

app.use(
  errors({
    statusCode: 400,
  })
);

app.use((err, req, res, next) => {
  if (err.details) {
    const firstError = Object.values(err.details)[0].details[0];

    return res.status(400).json({
      field: firstError.path[0],
      message: firstError.message,
    });
  }

  return res.status(500).json({
    message: "Erro interno do servidor",
  });
});



export default app;