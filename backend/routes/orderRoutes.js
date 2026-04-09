import express from "express";
import { auth } from "../middlewares/auth.js";
import { createOrder, addProductToOrder, removeProductFromOrder, getOrder, checkoutOrder, updateProductInOrder } from "../controllers/orderController.js";

const router = express.Router();

router.post("/", auth, createOrder);
router.get("/:orderId", auth, getOrder);
router.post("/:orderId/product", auth, addProductToOrder);
router.put("/:orderId/product/:productId", auth, updateProductInOrder);
router.delete("/:orderId/product/:productId", auth, removeProductFromOrder);
router.post("/:orderId/checkout", auth, checkoutOrder);

export default router;