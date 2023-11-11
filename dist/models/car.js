"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsModel = void 0;
const base_1 = require("./base");
class CarsModel extends base_1.ModelWithValidator {
    static get tableName() {
        return "cars";
    }
    static get jsonSchema() {
        return {
            type: "object",
            required: ["plate", "model"],
            properties: {
                plate: { type: "string", minLength: 5 },
                model: { type: "string", minLength: 1 },
                rentPerDay: { type: "number", minimum: 100000 },
            },
        };
    }
}
exports.CarsModel = CarsModel;
