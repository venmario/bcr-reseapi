import express, { Application, Request, Response } from "express";
import cors from "cors";
import * as config from "./knexfile";
import UISwaggerExpress from "swagger-ui-express";
import { swaggerSpec } from "./utils/generate-docs";
import viewRoute from "./routes/ViewRoute";
import authRoute from "./routes/AuthRoute";
import carRoute from "./routes/CarRoute";
import knex from "knex";
import { Model } from "objection";
import { join } from "node:path";
import { toBase64 } from "./utils/test";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: "dwy823csd",
  api_key: "997985659283223",
  api_secret: "rEUA993WB94SDSZhKKG6jurbJqo"
});
const ENV = "development";
//@ts-expect-error
const knexInstance = knex(config[ENV]);
Model.knex(knexInstance);

const app: Application = express();
app.use(cors());
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json({ limit: "20mb" }));

app.use("/docs", UISwaggerExpress.serve, UISwaggerExpress.setup(swaggerSpec));

app.get("/testing", async (_: Request, res: Response) => {
  const imagePath = join(__dirname, "..", "public", "images", "car01.min.jpg");
  const base64image = `data:image/jpeg;base64,${toBase64(imagePath)}`;
  const options = {
    use_filename: true,
    unique_filename: true,
    overwrite: true
  };
  const result = await cloudinary.uploader.upload(
    "https://i.ibb.co/58nQ0C0/car01-min.jpg",
    options
  );

  return res.send(result.secure_url.toString());
  res.send(base64image);
});
/**
 * @openapi
 * tags:
 *  -name: Auth
 *   description: Authentication endpoints
 *  -name: Cars
 *   description: Car resource endpoints
 */
app.use(viewRoute);
app.use(authRoute);
app.use("/api", carRoute);

export default app;
