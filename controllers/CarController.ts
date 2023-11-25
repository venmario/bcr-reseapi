import { Express, Request, Response } from "express";
import { Cars, CarsModel } from "../models/car";
import { setAvailableat } from "../utils/availableAt";
import { ValidationError } from "objection";
import auth from "../middleware/auth";
import { CarService } from "../service/CarService";
export class CarController {
  service: CarService;

  constructor() {
    this.service = new CarService();
  }

  // init() {
  //   const prefix: string = "cars";
  //   this.app.get("/", this.index); //render index page
  //   this.app.get(`/${prefix}`, this.rentCar); //render car page
  //   this.app.get(`/api/${prefix}`, auth, this.getCars); // api get all cars
  //   this.app.get(`/api/${prefix}/:id`, auth, this.getCar);
  //   this.app.post(`/api/${prefix}`, auth, this.createCar); // api create new car
  //   this.app.patch(`/api/${prefix}/:id`, auth, this.updateCar); //api update a car
  //   this.app.delete(`/api/${prefix}/:id`, auth, this.deleteCar); //api delete a car
  // }

  index = (_: Request, res: Response) => {
    res.render("index");
  };

  rentCar = async (req: Request, res: Response) => {
    let cars: object = [];
    if (
      req.query.driver != undefined &&
      req.query.tanggal != undefined &&
      req.query.waktu != undefined
    ) {
      const dt: Date = new Date(req.query.tanggal.toString());
      dt.setHours(parseInt(req.query.waktu.toString()), 0, 0, 0);
      const jumlah: number = req.query.jumlah
        ? parseInt(req.query.jumlah.toString())
        : 0;
      cars = await CarsModel.query()
        .where("driver", req.query.driver.toString())
        .where("availableAt", "<=", dt)
        .where("capacity", ">=", jumlah);
    }

    res.render("cars", { cars });
  };

  getCars = async (_: Request, res: Response) => {
    const cars = await this.service.getCars();
    // .withGraphFetched("users");
    res.send(cars);
  };

  getCar = async (req: Request, res: Response) => {
    const cars = await this.service.getCar(Number(req.params.id));
    if (cars) {
      return res.status(200).json(cars);
    }
    res.status(404).json({
      message: "Car not found!",
    });
  };

  createCar = async (req: Request<{}, {}, Cars, {}>, res: Response) => {
    try {
      const id = req.user?.id;
      const body = {
        ...req.body,
        driver: Math.floor(Math.random() * 2) == 1 ? true : false,
        specs: JSON.stringify(req.body.specs),
        options: JSON.stringify(req.body.options),
        created_by: id,
      };
      const car = await this.service.createCar(body as Cars);
      res.status(200).json(car);
    } catch (error) {
      if (error instanceof ValidationError) {
        res.send({
          message: error.message,
        });
      }
    }
  };

  updateCar = async (req: Request, res: Response) => {
    const id = req.user?.id;
    const body = {
      ...req.body,
      specs: JSON.stringify(req.body.specs),
      options: JSON.stringify(req.body.options),
      updated_at: new Date(),
      updated_by: id,
    };
    const car = await this.service.updateCar(Number(id), body);
    res.status(200).json(car);
  };

  deleteCar = async (req: Request, res: Response) => {
    const id = req.user?.id;
    const car = await this.service.deleteCar(Number(id));
    res.status(200).json(car);
  };
}
