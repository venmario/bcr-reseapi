import { Cars, CarsModel } from "../models/car";

export default class CarRepository {
  // index = (_: Request, res: Response){
  //   res.render("index");
  // };

  // async rentCar (){
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
    const cars = await CarsModel.query();
    return cars;
  }

  async getCar(id: number) {
    const cars = await CarsModel.query().findById(id).whereNull("deleted_at");
    return cars;
  }

  async createCar(body: Cars) {
    const car = await CarsModel.query().insert(body).returning("*");
    return car;
  }

  async updateCar(id: number, body: Partial<Cars>) {
    const car = await CarsModel.query()
      .findById(id)
      .whereNull("deleted_at")
      .patch(body)
      .throwIfNotFound()
      .returning("*");

    return car;
  }

  async deleteCar(id: number) {
    const car = await CarsModel.query().findById(id).throwIfNotFound().patch({
      deleted_at: new Date(),
      deleted_by: id,
    });
    return car;
  }
}
