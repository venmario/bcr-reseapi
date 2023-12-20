import { Router } from "express";
import auth from "../middleware/auth";
import { CarController } from "../controllers/CarController";
const carRoute = Router();
carRoute.use(auth);
const carController = new CarController();

const prefix: string = "cars";

/**
 * @openapi
 * /api/cars:
 *  get:
 *    summary: Get all car
 *    description: Get all car
 *    tags:
 *      - Cars
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: string
 *                  plate:
 *                    type: string
 *                  manufacture:
 *                    type: string
 *                  model:
 *                    type: string
 *                  image:
 *                    type: string
 *                  rentPerDay:
 *                    type: number
 *                  capacity:
 *                    type: number
 *                  description:
 *                    type: string
 *                  availableAt:
 *                    type: string
 *                    format: date-time
 *                  transmission:
 *                    type: string
 *                  available:
 *                    type: boolean
 *                  type:
 *                    type: string
 *                  year:
 *                    type: number
 *                  options:
 *                    type: array
 *                    items:
 *                      type: string
 *                  specs:
 *                    type: array
 *                    items:
 *                      type: string
 *                  created_by:
 *                    type: string
 *                    format: uuid
 *                  created_at:
 *                    type: string
 *                    format: date-time
 *                  updated_by:
 *                    type: string
 *                    format: uuid
 *                  updated_at:
 *                    type: string
 *                    format: date-time
 *                  deleted_by:
 *                    type: string
 *                    format: uuid
 *                  deleted_at:
 *                    type: string
 *                    format: date-time
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Token not found!
 */
carRoute.get(`/${prefix}`, carController.getCars); // api get all cars
/**
 * @openapi
 * /api/cars/{id}:
 *  get:
 *    summary: Get all car
 *    description: Get all car
 *    tags:
 *      - Cars
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Id of search car
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                $ref: '#/components/schemas/Car'
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Token not found!
 */
carRoute.get(`/${prefix}/:id`, carController.getCar); // api get car by id
/**
 * @openapi
 * /api/cars/:
 *  post:
 *    summary: Insert a car
 *    description: Insert a car
 *    tags:
 *      - Cars
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Car'
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                $ref: '#/components/schemas/Car'
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Token not found!
 */
carRoute.post(`/${prefix}`, carController.createCar); // api create new car
/**
 * @openapi
 * /api/cars:
 *  patch:
 *    summary: Update a car
 *    description: Update a car
 *    tags:
 *      - Cars
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Id of a car that will update
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *    requestBody:
 *      content:
 *        application/json:
 *          schema:
 *            type: object
 *            $ref: '#/components/schemas/Car'
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                $ref: '#/components/schemas/Car'
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Token not found!
 */
carRoute.patch(`/${prefix}/:id`, carController.updateCar); //api update a car
/**
 * @openapi
 * /api/cars/{id}:
 *  delete:
 *    summary: Delete a car
 *    description: Delete a car
 *    tags:
 *      - Cars
 *    parameters:
 *      - name: id
 *        in: path
 *        description: Id of a car that will delete
 *        required: true
 *        schema:
 *          type: string
 *          format: uuid
 *    security:
 *      - bearerAuth: []
 *    responses:
 *      200:
 *        description: OK
 *        content:
 *          application/json:
 *            schema:
 *                type: object
 *                $ref: '#/components/schemas/Car'
 *      '401':
 *        description: Unauthorized
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: Token not found!
 */
carRoute.delete(`/${prefix}/:id`, carController.deleteCar); //api delete a car

export default carRoute;
