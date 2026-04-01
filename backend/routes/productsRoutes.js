import express from "express";
const router = express.Router();

import Product from "../models/products.js";

// GET produtos
router.get("/", async (req, res) => {
  try {
    const produtos = await Product.find();
    res.json(produtos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
});

export default router; 