import express from "express";
import { createPaymentIntentController } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/create-payment-intent", createPaymentIntentController);
console.log("🔥 paymentRoutes carregado");

export default router;