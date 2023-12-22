import { describe, it, expect } from "vitest";
import supertest from "supertest";
import app from "../app";
describe("test auth API:/login", () => {
  let token = "";
  it("should success on login", async () => {
    const response = await supertest(app).post("/login").send({
      email: "superadmin@gmail.com",
      password: "superadmin"
    });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      token: expect.any(String)
    });
    token = response.body.token;
  });

  it("should be not found password", async () => {
    const response = await supertest(app).post("/login").send({
      email: "superadmin@gmail.com",
      password: ""
    });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("Empty Password");
  });
  it("should be not found user1", async () => {
    const response = await supertest(app).post("/login").send({
      email: "ngawor@gmail.com",
      password: "alk;sndf"
    });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found!");
  });
  it("should be not found user2", async () => {
    const response = await supertest(app).post("/login").send({
      email: "superadmin@gmail.com",
      password: "alk;sndf"
    });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found!");
  });
  it("should be not found user3", async () => {
    const response = await supertest(app).post("/login").send({
      email: "",
      password: ""
    });
    expect(response.status).toBe(404);
    expect(response.body.message).toBe("User not found!");
  });

  it("should error", async () => {
    const response = await supertest(app).post("/login").send({
      password: ""
    });
    expect(response.status).toBe(404);
  });

  it("should error 401", async () => {
    const response = await supertest(app)
      .get("/protected")
      .set("Authorization", `Bearer${token}`);
    expect(response.status).toBe(401);
  });

  it("should be not found token", async () => {
    const response = await supertest(app).get("/protected");
    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token not found!");
  });

  it("should be a valid token", async () => {
    const response = await supertest(app)
      .get("/protected")
      .set("Authorization", `Bearer ${token}`);
    expect(response.body.message).toBe("token valid");
    expect(response.status).toBe(200);
  });
});
