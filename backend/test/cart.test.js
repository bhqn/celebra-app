import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import Cart from "../models/cart.js";
import User from "../models/User.js";

let token;
let userId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
  await mongoose.connection.db.dropDatabase();

  const user = await User.create({
    name: "Teste",
    email: "teste@teste.com",
    password: "123456",
  });

  userId = user._id;

  // token válido para auth middleware
  const rawToken = jwt.sign({ id: userId }, process.env.JWT_SECRET);
  token = `Bearer ${rawToken}`;
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("Cart Controller", () => {
  it("deve criar carrinho e adicionar produto", async () => {
    const res = await request(app)
      .post("/api/cart")
      .set("Authorization", token)
      .send({
        products: [
          { productId: new mongoose.Types.ObjectId(), quantidade: 1, preco: 10 },
        ],
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.products.length).toBe(1);
  });

  it("deve listar carrinho", async () => {
    const res = await request(app)
      .get("/api/cart")
      .set("Authorization", token);

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("products");
  });

  it("deve remover item do carrinho", async () => {
    const cart = await Cart.findOne({ userId });
    expect(cart).not.toBeNull();
    expect(cart.products.length).toBeGreaterThan(0);

    const productId = cart.products[0].productId;

    const res = await request(app)
      .delete(`/api/cart/${productId}`)
      .set("Authorization", token);

    expect(res.statusCode).toBe(200);
  });
});