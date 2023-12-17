import { beforeAll, describe, expect, expectTypeOf, it } from "vitest";
import { login, toBase64 } from "../utils/test";
import supertest from "supertest";
import app from "../app";
import { Cars } from "../models/car";
import { join } from "path";

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

  const imagePath = join(__dirname, "..", "public", "images", "car01.min.jpg");
  const base64image = `data:image/jpeg;base64,${toBase64(imagePath)}`;
  const dataCar = {
    plate: "DBH-3491",
    manufacture: "Ford",
    model: "F150",
    image: base64image,
    rentPerDay: 200000,
    capacity: 2,
    description:
      " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
    availableAt: "2023-10-25T23:49:05.563Z",
    transmission: "Automatic",
    available: true,
    type: "Sedan",
    year: 2022,
    options: [
      "Cruise Control",
      "Tinted Glass",
      "Tinted Glass",
      "Tinted Glass",
      "AM/FM Stereo",
    ],
    specs: [
      "Brake assist",
      "Leather-wrapped shift knob",
      "Glove box lamp",
      "Air conditioning w/in-cabin microfilter",
      "Body color folding remote-controlled pwr mirrors",
      "Dual-stage front airbags w/occupant classification system",
    ],
  };
  it("should create a new car", async () => {
    const response = await supertest(app)
      .post("/api/cars")
      .set("Authorization", `Bearer ${token}`)
      .send(dataCar);
    expect(response.status).toBe(200);
    expect(response.body.image).toMatch("cloudinary");
    expect(response.body).toMatchObject({
      ...dataCar,
      id: expect.any(String),
      image: expect.any(String),
      updatedBy: expect.any(String),
      createdBy: expect.any(String),
      specs: JSON.stringify(dataCar.specs),
      options: JSON.stringify(dataCar.options),
    });
  });
});
