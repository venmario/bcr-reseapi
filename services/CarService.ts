import { Cars } from "../models/car";
import CarRepository from "../repositories/CarRepo";

export class CarService {
  private repository: CarRepository;

  constructor() {
    this.repository = new CarRepository();
  }

  async rentCars(driver: string, availableAt: Date, jumlah: number) {
    return await this.repository.rentCar(driver, availableAt, jumlah);
  }

  async getCars() {
    return await this.repository.getCars();
  }

  async getCar(id: string) {
    return await this.repository.getCar(id);
  }

  async createCar(body: Cars) {
    return await this.repository.createCar(body);
  }

  async updateCar(id: string, body: Partial<Cars>) {
    return await this.repository.updateCar(id, body);
  }

  async deleteCar(id: string, body: Partial<Cars>) {
    return await this.repository.deleteCar(id, body);
  }
}
