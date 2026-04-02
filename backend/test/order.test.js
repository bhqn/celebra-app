import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../app.js"; // seu app express
import mongoose from "mongoose";
import Product from "../models/products.js";
import Order from "../models/order.js";

let token = ""; // você pode mockar depois
let orderId = "";
let productId = "";

jest.setTimeout(20000);

jest.mock("../middlewares/auth.js", () => ({
  auth: (req, res, next) => {
    // usa ObjectId válido para passar na validação do Order.userId
    req.user = { id: "000000000000000000000001" };
    next();
  }
}));

beforeEach(async () => {
  await mongoose.connection.db.dropDatabase();

  // cria produto fake
  const product = await Product.create({
    nome: "Coxinha Teste",
    preco: 1000,
    categoria: "Comida",
    tipo: "produto"
  });
  productId = product._id.toString();

  // cria pedido fake padrao para cada teste
  const order = await Order.create({
    userId: "000000000000000000000001",
    dataEvento: "2026-04-20",
    horaInicio: "15:00",
    duracao: 3,
    tipoEvento: "Aniversário",
    local: "Rua Teste",
    convidados: 10,
    carrinho: [],
    total: 0
  });
  orderId = order._id.toString();
});

// 🔌 conecta antes dos testes
beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
});

// 🧹 limpa depois
afterAll(async () => {
  await mongoose.connection.close();
});

describe("Order Flow", () => {

  it("deve criar um pedido", async () => {
    const res = await request(app)
      .post("/api/order")
      .set("Authorization", `Bearer ${token}`)
      .send({
        dataEvento: "2026-04-20",
        horaInicio: "15:00",
        duracao: 3,
        tipoEvento: "Aniversário",
        local: "Rua Teste",
        convidados: 10
      });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");

    orderId = res.body._id;
  });

  it("deve adicionar produto ao pedido", async () => {
    const res = await request(app)
      .put(`/api/order/${orderId}/cart`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId,
        quantidade: 2,
        sabores: ["frango"]
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.carrinho.length).toBe(1);
    expect(res.body.total).toBe(2000);
  });

  it("deve somar quantidade ao adicionar o mesmo produto", async () => {
    // primeira adição
    await request(app)
      .put(`/api/order/${orderId}/cart`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId,
        quantidade: 2,
        sabores: ["frango"]
      });

    // segunda adição do mesmo produto
    const res2 = await request(app)
      .put(`/api/order/${orderId}/cart`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        productId,
        quantidade: 1,
        sabores: ["frango"]
      });

    expect(res2.statusCode).toBe(200);
    expect(res2.body.carrinho[0].quantidade).toBe(3);
  });

  it("deve remover produto do carrinho", async () => {
    const res = await request(app)
      .delete(`/api/order/${orderId}/cart/${productId}`)
      .set("Authorization", `Bearer ${token}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.carrinho.length).toBe(0);
  });

});