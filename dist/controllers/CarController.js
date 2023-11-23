"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarController = void 0;
const car_1 = require("../models/car");
const availableAt_1 = require("../function/availableAt");
const objection_1 = require("objection");
const auth_1 = __importDefault(require("./auth"));
class CarController {
    constructor(pApp) {
        this.index = (_, res) => {
            res.render("index");
        };
        this.rentCar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let cars = [];
            if (req.query.driver != undefined &&
                req.query.tanggal != undefined &&
                req.query.waktu != undefined) {
                const dt = new Date(req.query.tanggal.toString());
                dt.setHours(parseInt(req.query.waktu.toString()), 0, 0, 0);
                const jumlah = req.query.jumlah
                    ? parseInt(req.query.jumlah.toString())
                    : 0;
                cars = yield car_1.CarsModel.query()
                    .where("driver", req.query.driver.toString())
                    .where("availableAt", "<=", dt)
                    .where("capacity", ">=", jumlah);
            }
            res.render("cars", { cars });
        });
        this.getCars = (_, res) => __awaiter(this, void 0, void 0, function* () {
            const cars = yield car_1.CarsModel.query();
            res.send(cars);
        });
        this.getCar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const cars = yield car_1.CarsModel.query()
                .findById(req.params.id)
                .whereNull("deleted_at");
            if (cars) {
                return res.status(200).json(cars);
            }
            res.status(404).json({
                message: "Car not found!",
            });
        });
        this.createCar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const valRequest = req;
                const id = valRequest.authUser.id;
                const body = Object.assign(Object.assign({}, req.body), { driver: Math.floor(Math.random() * 2) == 1 ? true : false, availableAt: (0, availableAt_1.setAvailableat)(), specs: JSON.stringify(req.body.specs), options: JSON.stringify(req.body.options), created_by: id });
                const car = yield car_1.CarsModel.query().insert(body).returning("*");
                res.status(200).json(car);
            }
            catch (error) {
                if (error instanceof objection_1.ValidationError) {
                    res.send({
                        message: error.message,
                    });
                }
            }
        });
        this.updateCar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const valRequest = req;
            const id = valRequest.authUser.id;
            const body = Object.assign(Object.assign({}, req.body), { specs: JSON.stringify(req.body.specs), options: JSON.stringify(req.body.options), updated_at: new Date(), updated_by: id });
            const car = yield car_1.CarsModel.query()
                .findById(req.params.id)
                .whereNull("deleted_at")
                .patch(body)
                .returning("*");
            res.status(200).json(car);
        });
        this.deleteCar = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const valRequest = req;
            const id = valRequest.authUser.id;
            const car = yield car_1.CarsModel.query().findById(req.params.id).patch({
                deleted_at: new Date(),
                deleted_by: id,
            });
            res.status(200).json(car);
        });
        this.app = pApp;
    }
    init() {
        const prefix = "cars";
        this.app.get("/", this.index); //render index page
        this.app.get(`/${prefix}`, this.rentCar); //render car page
        this.app.get(`/api/${prefix}`, auth_1.default, this.getCars); // api get all cars
        this.app.get(`/api/${prefix}/:id`, auth_1.default, this.getCar);
        this.app.post(`/api/${prefix}`, auth_1.default, this.createCar); // api create new car
        this.app.patch(`/api/${prefix}/:id`, auth_1.default, this.updateCar); //api update a car
        this.app.delete(`/api/${prefix}/:id`, auth_1.default, this.deleteCar); //api delete a car
    }
}
exports.CarController = CarController;
