import express, { Application } from "express";
import cors from "cors";
import * as config from "./knexfile";
import UISwaggerExpress from "swagger-ui-express";
import { swaggerSpec } from "./utils/generate-docs";
import viewRoute from "./routes/ViewRoute";
import authRoute from "./routes/AuthRoute";
import carRoute from "./routes/CarRoute";
import knex from "knex";
import { Model } from "objection";

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
