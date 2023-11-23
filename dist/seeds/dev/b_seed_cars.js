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
Object.defineProperty(exports, "__esModule", { value: true });
exports.seed = void 0;
const availableAt_1 = require("../../function/availableAt");
function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        // Deletes ALL existing entries
        yield knex("cars").del();
        const response = yield fetch(`https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.json`);
        const cars = yield response.json();
        // Inserts seed entries
        // console.log(objCars);
        yield knex("cars").insert(cars.map((car) => {
            return Object.assign(Object.assign({}, car), { driver: Math.floor(Math.random() * 2) == 1 ? true : false, availableAt: (0, availableAt_1.setAvailableat)(), specs: JSON.stringify(car.specs), options: JSON.stringify(car.options), created_at: new Date(), created_by: 1 });
        }));
    });
}
exports.seed = seed;
