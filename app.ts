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

app.get("/testing", (_: Request, res: Response) => {
  const imagePath = join(__dirname, "..", "public", "images", "car01.min.jpg");
  const base64image = `data:image/jpeg;base64,${toBase64(imagePath)}`;
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
