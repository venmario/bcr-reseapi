"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CarsModel = void 0;
const objection_1 = require("objection");
const base_1 = require("./base");
const user_1 = require("./user");
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
    $beforeInsert() {
        this.created_at = new Date();
    }
}
exports.CarsModel = CarsModel;
CarsModel.relationMapping = {
    users: {
        relation: objection_1.Model.BelongsToOneRelation,
        modelClass: user_1.User,
        join: {
            from: "users.id",
            to: "cars.created_by",
        },
    },
};
