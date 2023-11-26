import { Router } from "express";
import { AuthenticationController } from "../controllers/AuthenticationController";

const authController = new AuthenticationController();
const authRoute = Router();

/**
 * @openapi
 * /login/:
 *  post:
 *    summary: Login to authenticate
 *    description: Login to authenticate
 *    tags:
 *      - Auth
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            properties:
 *              email:
 *                type: string
 *                format: email
 *              password:
 *                type: string
 *                format: password
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                properties:
 *                  token:string
 *      '404':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: User not found!
 */
authRoute.post("/login", authController.login);

export default authRoute;
