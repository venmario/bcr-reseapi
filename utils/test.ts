import supertest from "supertest";
import type { Application } from "express";
import { readFileSync } from "node:fs";
export async function login(
  st: typeof supertest,
  app: Application
): Promise<string> {
  const response = await st(app).post("/login").send({
    email: "superadmin@gmail.com",
    password: "superadmin"
  });
  return response.body.token;
}

export function toBase64(filePath: string): string {
  const img = readFileSync(filePath, { encoding: "base64" });
  return img.toString();
}
