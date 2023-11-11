"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const express_1 = __importDefault(require("express"));
const knex_1 = __importDefault(require("knex"));
const config = __importStar(require("./knexfile"));
const objection_1 = require("objection");
const car_1 = require("./models/car");
const availableAt_1 = require("./function/availableAt");
const PORT = 3000;
const app = (0, express_1.default)();
const ENV = "development";
// @ts-expect-error
const knexInstance = (0, knex_1.default)(config[ENV]);
objection_1.Model.knex(knexInstance);
app.set("view engine", "ejs");
app.use(express_1.default.static("public"));
app.use(express_1.default.json());
app.get("/favicon.ico", (_, res) => {
    res.status(204);
});
app.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // const cars = await CarsModel.query();'
    // req.params;
    let cars = [];
    if (req.query.driver == undefined &&
        req.query.tanggal == undefined &&
        req.query.waktu == undefined) {
    }
    else {
        const dt = new Date(req.query.tanggal.toString());
        dt.setHours(parseInt(req.query.waktu.toString()), 0, 0, 0);
        const jumlah = req.query.jumlah.toString()
            ? parseInt(req.query.jumlah.toString())
            : 0;
        cars = yield car_1.CarsModel.query()
            .where("driver", req.query.driver.toString())
            .where("availableAt", ">=", dt)
            .where("capacity", ">=", jumlah);
    }
    res.render("index", { cars });
}));
// app.use("/");
app.get("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const cars = yield car_1.CarsModel.query().findById(req.params.id);
    res.send(cars);
}));
app.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = Object.assign(Object.assign({}, req.body), { driver: Math.floor(Math.random() * 2) == 1 ? true : false, availableAt: (0, availableAt_1.setAvailableat)(), specs: JSON.stringify(req.body.specs), options: JSON.stringify(req.body.options) });
        const car = yield car_1.CarsModel.query().insert(body).returning("*");
        res.send(car);
    }
    catch (error) {
        if (error instanceof objection_1.ValidationError) {
            res.send({
                message: error.message,
            });
        }
    }
}));
app.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = Object.assign(Object.assign({}, req.body), { specs: JSON.stringify(req.body.specs), options: JSON.stringify(req.body.options) });
    const car = yield car_1.CarsModel.query()
        .findById(req.params.id)
        .patch(body)
        .returning("*");
    res.status(200).json(car);
}));
app.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const car = yield car_1.CarsModel.query().deleteById(req.params.id);
    res.status(200).json(car);
}));
app.listen(PORT, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
