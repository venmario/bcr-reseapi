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
    const car = CarsModel.fromJson(body, { skipValidation: true });
    return await CarsModel.query()
      .findById(id)
      .whereNull("deleted_at")
      .update(car)
      .throwIfNotFound()
      .returning("*");
  }

  async deleteCar(id: string) {
    const car = await CarsModel.query().deleteById(id);
    return car;
  }
}
