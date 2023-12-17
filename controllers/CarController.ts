import { Request, Response } from "express";
import { Cars } from "../models/car";
import { ValidationError } from "objection";
import { CarService } from "../services/CarService";
import { errorWrapper } from "../utils/error-wrapper";
export class CarController {
  service: CarService;

  constructor() {
    this.service = new CarService();
  }

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
      const jumlah: number = req.query.jumlah ? Number(req.query.jumlah) : 0;
      const driver: string = req.query.driver.toString();
      cars = await this.service.rentCars(driver, dt, jumlah);
    }

    // res.render("cars", { cars });
    res.status(200).json(cars);
  };

  getCars = async (_: Request, res: Response) => {
    const result = await errorWrapper(this.service.getCars());
    // .withGraphFetched("users");
    res.status(result.status).send(result.data);
  };

  getCar = async (req: Request, res: Response) => {
    const result = await errorWrapper(this.service.getCar(req.params.id));
    if (result.data) {
      return res.status(200).json(result.data);
    }
    res.status(404).json({
      message: "Car not found!"
    });
  };

  createCar = async (req: Request<{}, {}, Cars, {}>, res: Response) => {
    const userId = req.user?.id;
    const body = {
      ...req.body,
      specs: JSON.stringify(req.body.specs),
      options: JSON.stringify(req.body.options),
      created_by: userId
    };
    const result = await errorWrapper(this.service.createCar(body as Cars));
    res.status(result.status).json(result.data);
  };

  updateCar = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const carId = req.params.id;

    if (req.body.specs) {
      req.body.specs = JSON.stringify(req.body.specs);
    }
    if (req.body.options) {
      req.body.options = JSON.stringify(req.body.options);
    }
    const body = {
      ...req.body,
      updated_at: new Date(),
      updated_by: userId
    };
    const result = await errorWrapper(this.service.updateCar(carId, body));
    res.status(result.status).json(result.data);
  };

  deleteCar = async (req: Request, res: Response) => {
    const userId = req.user?.id;
    const carId = req.params.id;
    const body = {
      deleted_at: new Date(),
      deleted_by: Number(userId)
    };
    const result = await errorWrapper(this.service.deleteCar(carId, body));
    res.status(result.status).json(result.data);
  };
}
