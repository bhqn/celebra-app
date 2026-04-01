import express from "express";
import { auth } from "../middlewares/auth.js";
import { createOrder, addProductToOrder, removeProductFromOrder, getOrder, checkoutOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", auth, createOrder); // criar pedido
router.get("/:orderId", auth, getOrder); // pegar pedido
router.put("/:orderId/cart", auth, addProductToOrder); // adicionar produto
router.delete("/:orderId/cart/:productId", auth, removeProductFromOrder); // remover produto
router.post("/:orderId/checkout", auth, checkoutOrder); // finalizar pedido

export default router;