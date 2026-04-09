import express from "express";
import { addToCart, getCart, removeFromCart, updateCartItem } from "../controllers/cartController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/", auth, addToCart);
router.get("/", auth, getCart);
router.delete("/:productId", auth, removeFromCart);
router.put("/:productId", auth, updateCartItem);

export default router;
