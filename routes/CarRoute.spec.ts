import { beforeAll, describe, expect, expectTypeOf, it } from "vitest";
import { login, toBase64 } from "../utils/test";
import supertest from "supertest";
import app from "../app";
import { Cars } from "../models/car";
import { join } from "path";
import { as } from "vitest/dist/reporters-OH1c16Kq";
import { errorWrapper, to } from "../utils/error-wrapper";

describe("test auth API:/cars", () => {
  let token = "";
  beforeAll(async () => {
    token = await login(supertest, app);
  });

  it("should not able to create cars if not logged in", async () => {
    const response = await supertest(app).get("/api/cars");
    expect(response.status).toBe(401);
    expect(response.body).toMatchObject({ message: "Token not found!" });
  });

  it("should get filtered cars", async () => {
    const response = await supertest(app).get(
      "/cars?driver=true&tanggal=2023-12-31&waktu=10"
    );
    expect(response.status).toBe(200);
    expectTypeOf<Cars[]>().toMatchTypeOf<Cars[]>();
  });

  it("should get filtered cars with capacity 4 or more", async () => {
    const response = await supertest(app).get(
      "/cars?driver=true&tanggal=2023-12-31&waktu=10&jumlah=4"
    );
    expect(response.status).toBe(200);
    expectTypeOf<Cars[]>().toMatchTypeOf<Cars[]>();
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
  const updateImagePath = join(
    __dirname,
    "..",
    "public",
    "images",
    "car02.min.jpg"
  );
  const base64UpdateImage = `data:image/jpeg;base64,${toBase64(
    updateImagePath
  )}`;

  const dataCar = {
    "plate": "TEST",
    "manufacture": "Ford",
    "model": "F150",
    "image": base64image,
    "rentPerDay": 200000,
    "capacity": 2,
    "description":
      " Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.",
    "availableAt": "2023-10-25T23:49:05.563Z",
    "transmission": "Automatic",
    "available": true,
    "type": "Sedan",
    "year": 2022,
    "options": [
      "Cruise Control",
      "Tinted Glass",
      "Tinted Glass",
      "Tinted Glass",
      "AM/FM Stereo"
    ],
    "specs": [
      "Brake assist",
      "Leather-wrapped shift knob",
      "Glove box lamp",
      "Air conditioning w/in-cabin microfilter",
      "Body color folding remote-controlled pwr mirrors",
      "Dual-stage front airbags w/occupant classification system"
    ]
  };
  let newCar: Cars;
  it("should create a new car", async () => {
    const response = await supertest(app)
      .post("/api/cars")
      .set("Authorization", `Bearer ${token}`)
      .send(dataCar);
    newCar = response.body;
    expect(response.status).toBe(200);
    expect(response.body.image).toMatch("cloudinary");
    expect(response.body).toMatchObject({
      ...dataCar,
      id: expect.any(String),
      image: expect.any(String),
      availableAt: expect.any(String),
      created_by: expect.any(Number),
      created_at: expect.any(String),
      updated_by: null,
      updated_at: null,
      deleted_by: null,
      deleted_at: null
    });
  });

  it("should failed to create a new car", async () => {
    const response = await supertest(app)
      .post("/api/cars")
      .set("Authorization", `Bearer ${token}`)
      .send({ ...dataCar, image: "" });
    expect(response.status).toBe(400);
    expect(response.body).toBe("image: must have required property 'image'");
  });

  it("should be get the new car", async () => {
    const response = await supertest(app)
      .get(`/api/cars/${newCar.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body).toMatchObject(newCar);
  });

  it("should not get any car", async () => {
    const response = await supertest(app)
      .get(`/api/cars/bbbc6793-3245-458e-93ac-e445f51ef1fd`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body).toBe("NotFoundError");
  });

  const updatedCar = {
    "plate": "Updated Test",
    "specs": ["spec1", "spec2"],
    "options": ["opt1", "opt2"]
  };

  it("should update the new car", async () => {
    const response = await supertest(app)
      .patch(`/api/cars/${newCar.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send(updatedCar);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ...newCar,
      ...updatedCar,
      updated_at: expect.any(String),
      updated_by: expect.any(Number)
    });
  });

  it("should get the updated car", async () => {
    const response = await supertest(app)
      .get(`/api/cars/${newCar.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      ...newCar,
      ...updatedCar,
      updated_at: expect.any(String),
      updated_by: expect.any(Number)
    });
  });

  it("should update new car image", async () => {
    const response = await supertest(app)
      .patch(`/api/cars/${newCar.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ image: base64UpdateImage });
    expect(response.status).toBe(200);
    expect(response.body).toMatchObject({
      image: expect.any(String)
    });
  });

  it("should error when update the car with wrong imagepath", async () => {
    const response = await supertest(app)
      .patch(`/api/cars/${newCar.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({ image: "http://ngawor.com" });
    expect(response.body).toMatch("Resource not found");
    expect(response.status).toBe(500);
  });

  it("should delete the new car", async () => {
    const response = await supertest(app)
      .delete(`/api/cars/${newCar.id}`)
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toBe(1);
  });

  it("should error from errorWrapper", async () => {
    const errorExt = { testError: "testError" };
    const error = new Error("Generic error");
    const result = await errorWrapper(to(Promise.reject(error), errorExt));
    expect(result.data).toMatchObject([
      {
        testError: "testError"
      },
      undefined
    ]);
  });
});
