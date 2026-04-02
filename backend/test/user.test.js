import dotenv from "dotenv";
dotenv.config();

import request from "supertest";
import app from "../app.js";
import mongoose from "mongoose";
import User from "../models/User.js";

let token;
let addressId;

beforeAll(async () => {
  await mongoose.connect(process.env.MONGO_URI_TEST);
  await mongoose.connection.db.dropDatabase();
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe("User Controller", () => {
  it("deve registrar usuário", async () => {
    const res = await request(app).post("/user/register").send({
      name: "Bernardo",
      email: "bernardo@test.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");

    token = `Bearer ${res.body.token}`;
  });

  it("deve fazer login", async () => {
    const res = await request(app).post("/user/login").send({
      email: "bernardo@test.com",
      password: "123456",
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
  });

  it("deve adicionar endereço", async () => {
    const res = await request(app)
      .post("/user/address")
      .set("Authorization", token)
      .send({
        rua: "Rua A",
        cidade: "Rio",
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);

    addressId = res.body[0]._id;
  });

  it("deve listar endereços", async () => {
    const res = await request(app)
      .get("/user/address")
      .set("Authorization", token);

    expect(res.statusCode).toBe(200);
    expect(res.body.length).toBeGreaterThan(0);
  });

  it("deve remover endereço", async () => {
    const res = await request(app)
      .delete(`/user/address/${addressId}`)
      .set("Authorization", token);

    expect(res.statusCode).toBe(200);
  });
});