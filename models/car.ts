import { Model, ModelObject, QueryContext } from "objection";
import { ModelWithValidator } from "./base";
import { User } from "./user";

export class CarsModel extends ModelWithValidator {
  id!: number;
  plate!: string;
  manufacture!: string;
  image?: string;
  model!: string;
  type!: string;
  description!: string;
  transmission!: string;
  capacity!: number;
  rentPerDay!: number;
  availableAt!: Date;
  available!: boolean;
  driver!: boolean;
  year!: number;
  options!: string;
  specs!: string;
  created_at!: Date;
  updated_at!: Date;
  deleted_at!: Date;
  created_by!: number;
  updated_by!: number;
  deleted_by!: number;

  static get tableName() {
    return "cars";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "transmission",
        "model",
        "year",
        "type",
        "manufacture",
        "capacity",
        "image"
      ],
      properties: {
        transmission: { type: "string", minLength: 1 },
        capacity: { type: "number", minLength: 1 },
        model: { type: "string", minLength: 1 },
        type: { type: "string", minLength: 1 },
        manufacture: { type: "string", minLength: 1 },
        image: { type: "string" },
        year: { type: "number", minLength: 4 },
        rentPerDay: { type: "number", minimum: 100_000 }
      }
    };
  }
  static relationMapping = {
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "cars.created_by",
        to: "users.id"
      }
    }
  };

  $beforeInsert(): void | Promise<any> {
    this.created_at = new Date();
  }
}

export type Cars = ModelObject<CarsModel>;
