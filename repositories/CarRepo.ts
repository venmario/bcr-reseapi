import { Cars, CarsModel } from "../models/car";

export default class CarRepository {
  async rentCar(driver: string, availableAt: Date, jumlah: number) {
    return await CarsModel.query()
      .where("driver", driver)
      .where("availableAt", "<=", availableAt)
      .where("capacity", ">=", jumlah);
  }

  async getCars() {
    const cars = await CarsModel.query();
    return cars;
  }

  async getCar(id: string) {
    const cars = await CarsModel.query().findById(id).whereNull("deleted_at");
    return cars;
  }

  async createCar(body: Cars) {
    const car = await CarsModel.query().insert(body).returning("*");
    return car;
  }

  async updateCar(id: string, body: Partial<Cars>) {
    const car = await CarsModel.query()
      .findById(id)
      .whereNull("deleted_at")
      .patch(body)
      .throwIfNotFound()
      .returning("*");

    return car;
  }

  async deleteCar(id: string, body: Partial<Cars>) {
    const car = await CarsModel.query()
      .findById(id)
      .whereNull("deleted_at")
      .throwIfNotFound()
      .patch(body)
      .returning("*");
    return car;
  }
}
