import Stripe from "stripe";
import dotenv from "dotenv";

dotenv.config();


const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const createPaymentIntent = async (amount) => {
  return await stripe.paymentIntents.create({
    amount,
    currency: "brl",
    payment_method_types: ["card"],
  });
};