import { Router } from "express";
import auth from "../middleware/auth";
import { CarController } from "../controllers/CarController";
const carRoute = Router();
carRoute.use(auth);
const carController = new CarController();

const prefix: string = "cars";

carRoute.get(`/${prefix}`, carController.getCars); // api get all cars
carRoute.get(`/${prefix}/:id`, carController.getCar); // api get car by id
carRoute.post(`/${prefix}`, carController.createCar); // api create new car
carRoute.patch(`/${prefix}/:id`, carController.updateCar); //api update a car
carRoute.delete(`/${prefix}/:id`, carController.deleteCar); //api delete a car

export default carRoute;
