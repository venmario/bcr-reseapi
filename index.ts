import express, { Express, Response, Request } from "express";
import knex from "knex";
import * as config from "./knexfile";
import { Model } from "objection";
import carRoute from "./routes/CarRoute";
import viewRoute from "./routes/ViewRoute";
import authRoute from "./routes/AuthRoute";

const PORT: number = 3000;

const app: Express = express();
const ENV = "development";
//@ts-expect-error
const knexInstance = knex(config[ENV]);

Model.knex(knexInstance);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

app.get("/favicon.ico", (_: Request, res: Response) => {
  res.status(204);
});

app.use(viewRoute);
app.use(authRoute);
app.use("/api", carRoute);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
