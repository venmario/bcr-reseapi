import { describe, it, expect } from "vitest";
import supertest from "supertest";
import app from "./app";
describe("test server module", () => {
  it("it should be able to view home page", async () => {
    const response = await supertest(app).get("/");
    expect(response.status).toBe(200);
    expect(response.headers["content-type"]).toBe("text/html; charset=utf-8");
    expect(
      response.text.includes("Sewa & Rental Terbaik di kawasan (Lokasimu)")
    ).toBe(true);
  });
});
