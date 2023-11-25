import { Cars } from "../models/car";
import CarRepository from "../repositories/CarRepo";

export class CarService {
  private repository: CarRepository;

  constructor() {
    this.repository = new CarRepository();
  }
  // index = (_: Request, res: Response) => {
  //   res.render("index");
  // };

  // rentCar = async (req: Request, res: Response) => {
  //   let cars: object = [];
  //   if (
  //     req.query.driver != undefined &&
  //     req.query.tanggal != undefined &&
  //     req.query.waktu != undefined
  //   ) {
  //     const dt: Date = new Date(req.query.tanggal.toString());
  //     dt.setHours(parseInt(req.query.waktu.toString()), 0, 0, 0);
  //     const jumlah: number = req.query.jumlah
  //       ? parseInt(req.query.jumlah.toString())
  //       : 0;
  //     cars = await CarsModel.query()
  //       .where("driver", req.query.driver.toString())
  //       .where("availableAt", "<=", dt)
  //       .where("capacity", ">=", jumlah);
  //   }

  //   res.render("cars", { cars });
  // };

  async getCars() {
    return await this.repository.getCars();
  }

  async getCar(id: number) {
    return await this.repository.getCar(id);
  }

  async createCar(body: Cars) {
    return await this.repository.createCar(body);
  }

  async updateCar(id: number, body: Partial<Cars>) {
    return await this.repository.updateCar(id, body);
  }

  async deleteCar(id: number) {
    return await this.repository.deleteCar(id);
  }
}
