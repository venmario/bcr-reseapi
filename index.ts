import express, { Express, Response, Request } from "express";
import knex from "knex";
import * as config from "./knexfile";
import { Model, ValidationError } from "objection";
import { Cars, CarsModel } from "./models/car";
import { setAvailableat } from "./function/availableAt";
import { type } from "os";

const PORT: number = 3000;

const app: Express = express();
const ENV = "development";
// @ts-expect-error
const knexInstance = knex(config[ENV]);

Model.knex(knexInstance);

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());

app.get("/favicon.ico", (_: Request, res: Response) => {
  res.status(204);
});

app.get("/", async (req: Request, res: Response) => {
  // const cars = await CarsModel.query();'
  // req.params;
  let cars: object = [];
  if (
    req.query.driver == undefined &&
    req.query.tanggal == undefined &&
    req.query.waktu == undefined
  ) {
  } else {
    const dt: Date = new Date(req.query.tanggal!.toString());
    dt.setHours(parseInt(req.query.waktu!.toString()), 0, 0, 0);
    const jumlah: number = req.query.jumlah!.toString()
      ? parseInt(req.query.jumlah!.toString())
      : 0;
    cars = await CarsModel.query()
      .where("driver", req.query.driver!.toString())
      .where("availableAt", ">=", dt)
      .where("capacity", ">=", jumlah);
  }
  res.render("index", { cars });
});

// app.use("/");

app.get("/:id", async (req: Request, res: Response) => {
  const cars = await CarsModel.query().findById(req.params.id);
  res.send(cars);
});

app.post("/", async (req: Request<{}, {}, Cars, {}>, res: Response) => {
  try {
    const body = {
      ...req.body,
      driver: Math.floor(Math.random() * 2) == 1 ? true : false,
      availableAt: setAvailableat(),
      specs: JSON.stringify(req.body.specs),
      options: JSON.stringify(req.body.options),
    };
    const car = await CarsModel.query().insert(body).returning("*");
    res.send(car);
  } catch (error) {
    if (error instanceof ValidationError) {
      res.send({
        message: error.message,
      });
    }
  }
});

app.patch("/:id", async (req: Request, res: Response) => {
  const body = {
    ...req.body,
    specs: JSON.stringify(req.body.specs),
    options: JSON.stringify(req.body.options),
  };
  const car = await CarsModel.query()
    .findById(req.params.id)
    .patch(body)
    .returning("*");
  res.status(200).json(car);
});

app.delete("/:id", async (req: Request, res: Response) => {
  const car = await CarsModel.query().deleteById(req.params.id);
  res.status(200).json(car);
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
