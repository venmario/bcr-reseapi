import supertest from "supertest";
import type { Application } from "express";

export async function login(
  st: typeof supertest,
  app: Application
): Promise<string> {
  const response = await st(app).post("/login").send({
    email: "superadmin@gmail.com",
    password: "superadmin",
  });
  return response.body.token;
}
