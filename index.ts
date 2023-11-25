import express, { Express, Response, Request } from "express";
import knex from "knex";
import * as config from "./knexfile";
import { Model } from "objection";
import { v2 as cloudinary } from "cloudinary";
import { CarController } from "./controllers/CarController";
import { AuthenticationController } from "./controllers/AuthenticationController";
import carRoute from "./routes/CarRoute";

cloudinary.config({
  cloud_name: "dwy823csd",
  api_key: "997985659283223",
  api_secret: "rEUA993WB94SDSZhKKG6jurbJqo",
});

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

new AuthenticationController(app).init();

app.use("/", carRoute);

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
