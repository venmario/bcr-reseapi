import { Router } from "express";
import auth from "../middleware/auth";
import { CarController } from "../controllers/CarController";
const carRoute = Router();
const carController = new CarController();

const prefix: string = "cars";
carRoute.get("/", carController.index); //render index page
carRoute.get(`/${prefix}`, carController.rentCar); //render car page
carRoute.get(`/api/${prefix}`, auth, carController.getCars); // api get all cars
carRoute.get(`/api/${prefix}/:id`, auth, carController.getCar);
carRoute.post(`/api/${prefix}`, auth, carController.createCar); // api create new car
carRoute.patch(`/api/${prefix}/:id`, auth, carController.updateCar); //api update a car
carRoute.delete(`/api/${prefix}/:id`, auth, carController.deleteCar); //api delete a car

export default carRoute;
