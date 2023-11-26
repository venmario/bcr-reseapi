import express, { Express, Response, Request } from "express";
import knex from "knex";
import * as config from "./knexfile";
import { Model } from "objection";
import carRoute from "./routes/CarRoute";
import viewRoute from "./routes/ViewRoute";
import authRoute from "./routes/AuthRoute";
import UISwaggerExpress from "swagger-ui-express";
import { swaggerSpec } from "./utils/generate-docs";

const PORT: number = 3000;

const app: Express = express();
const ENV = "development";
//@ts-expect-error
const knexInstance = knex(config[ENV]);

Model.knex(knexInstance);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

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

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
