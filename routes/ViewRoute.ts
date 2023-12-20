import { Router } from "express";
import { CarController } from "../controllers/CarController";

const viewRoute = Router();
const carController = new CarController();
viewRoute.get("/", carController.index); //render index page
viewRoute.get(`/cars`, carController.rentCar); //render car page

export default viewRoute;
