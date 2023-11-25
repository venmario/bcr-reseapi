import { Router } from "express";
import { AuthenticationController } from "../controllers/AuthenticationController";

const authController = new AuthenticationController();
const authRoute = Router();
authRoute.post("/login", authController.login);

export default authRoute;
