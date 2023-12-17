import { Cars } from "../models/car";
import CarRepository from "../repositories/CarRepo";
import { v2 as cloudinary } from "cloudinary";
import { setAvailableat } from "../utils/availableAt";
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
    if (body.image) {
      const uploadedImage = await this.uploadImage(body.image);
      body = {
        ...body,
        image: uploadedImage,
        availableAt: setAvailableat()
      };
    } else {
      delete body.image;
    }
    return await this.repository.createCar(body);
  }

  async updateCar(id: string, body: Partial<Cars>) {
    if (body.image) {
      body = {
        ...body,
        image: await this.uploadImage(body.image!)
      };
    }
    return await this.repository.updateCar(id, body);
  }

  async deleteCar(id: string) {
    return await this.repository.deleteCar(id);
  }

  async uploadImage(filePath: string): Promise<string> {
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true
    };
    try {
      const result = await cloudinary.uploader.upload(filePath, options);
      return result.secure_url.toString();
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
