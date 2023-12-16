import { beforeAll, describe, expect, expectTypeOf, it } from "vitest";
import { login } from "../utils/test";
import supertest from "supertest";
import app from "../app";
import { Cars } from "../models/car";

describe("test auth API:/cars", () => {
  let token = "";
  beforeAll(async () => {
    token = await login(supertest, app);
  });

  it("should not able to create cars if not logged in", async () => {
    const response = await supertest(app).get("/protected");
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: "Token not found!" });
  });

  it("should get all cars", async () => {
    const response = await supertest(app)
      .get("/api/cars")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expectTypeOf<Cars[]>().toMatchTypeOf<Cars[]>();
  });
});
