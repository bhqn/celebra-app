import { createPaymentIntent } from "../services/stripeService.js";
import Order from "../models/order.js";
export const createPaymentIntentController = async (req, res) => {
  try {
    const { orderId } = req.body;

    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ error: "Order não encontrada" });
    }

    const paymentIntent = await createPaymentIntent(order.total);

    res.json({
      clientSecret: paymentIntent.client_secret,
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};