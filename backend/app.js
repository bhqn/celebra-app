import express from "express";
import cors from "cors";

import userRoutes from "./routes/userRoutes.js";
import productsRoute from "./routes/productsRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();

//  Middlewares
app.use(cors());
app.use(express.json());

//  Rotas
app.use("/user", userRoutes);
app.use("/products", productsRoute);
app.use("/api/cart", cartRoutes);
app.use("/api/order", orderRoutes);

//  Rota teste
app.get("/", (req, res) => {
  res.send("API rodando ");
});

export default app;