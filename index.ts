import express, { Express, Response, Request } from "express";
import cors from "cors";
import knex from "knex";
import * as config from "./knexfile";
import { Model } from "objection";
import carRoute from "./routes/CarRoute";
import viewRoute from "./routes/ViewRoute";
import authRoute from "./routes/AuthRoute";
import UISwaggerExpress from "swagger-ui-express";
import { swaggerSpec } from "./utils/generate-docs";
import { v2 as cloudinary } from "cloudinary";
import { log } from "console";
cloudinary.config({
  cloud_name: "dwy823csd",
  api_key: "997985659283223",
  api_secret: "rEUA993WB94SDSZhKKG6jurbJqo",
});
const PORT: number = 3000;
const hostname = "0.0.0.0";
const app: Express = express();
const ENV = "production";
//@ts-expect-error
const knexInstance = knex(config[ENV]);
Model.knex(knexInstance);

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

app.listen(PORT, hostname, () => {
  console.log(process.env.DATABASE_URL);

  console.log(`⚡️[server]: Server is running on port ${PORT}`);
});
