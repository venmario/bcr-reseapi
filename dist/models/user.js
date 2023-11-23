"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const objection_1 = require("objection");
const base_1 = require("./base");
const car_1 = require("./car");
class User extends base_1.ModelWithValidator {
    static get tableName() {
        return "users";
    }
    static get idColumn() {
        return "id";
    }
    static get jsonSchema() {
        return {
            type: "object",
            required: ["username", "email", "password", "role"],
            properties: {
                id: { type: "integer" },
                username: { type: "string", minLength: 1, maxLength: 255 },
                password: { type: "string", minLength: 1, maxLength: 255 },
                role: { type: "string", minLength: 3, maxLength: 30 },
            },
        };
    }
}
exports.User = User;
User.relationMapping = {
    cars: {
        relation: objection_1.Model.HasManyRelation,
        modelClass: car_1.CarsModel,
        join: {
            from: "users.id",
            to: "cars.created_by",
        },
    },
};
