import express from "express";
import { createPaymentIntentController } from "../controllers/paymentController.js";
import { auth } from "../middlewares/auth.js";

const router = express.Router();

router.post("/create-payment-intent", auth, createPaymentIntentController);


export default router;