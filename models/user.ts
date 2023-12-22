import { Model, ModelObject } from "objection";
import { ModelWithValidator } from "./base";
import { CarsModel } from "./car";

export class User extends ModelWithValidator {
  id!: number;
  username!: string;
  email!: string;
  password!: string;
  role!: string;
  static get tableName() {
    return "users";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "email", "password", "role"],

      properties: {
        id: { type: "integer" },
        username: { type: "string", minLength: 1, maxLength: 255 },
        password: { type: "string", minLength: 1, maxLength: 255 },
        role: { type: "string", minLength: 3, maxLength: 30 }
      }
    };
  }

  static relationMapping = {
    cars: {
      relation: Model.HasManyRelation,
      modelClass: CarsModel,
      join: {
        from: "users.id",
        to: "cars.created_by"
      }
    }
  };
}

export type IUser = ModelObject<User>;
