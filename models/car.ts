import { Model, ModelObject, QueryContext } from "objection";
import { ModelWithValidator } from "./base";
import { User } from "./user";

export class CarsModel extends ModelWithValidator {
  id!: number;
  plate!: string;
  manufacture!: string;
  image!: string;
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
      required: ["plate", "model"],
      properties: {
        plate: { type: "string", minLength: 5 },
        model: { type: "string", minLength: 1 },
        rentPerDay: { type: "number", minimum: 100_000 },
      },
    };
  }
  static relationMapping = {
    users: {
      relation: Model.BelongsToOneRelation,
      modelClass: User,
      join: {
        from: "users.id",
        to: "cars.created_by",
      },
    },
  };

  $beforeInsert(): void | Promise<any> {
    this.created_at = new Date();
  }
}

export type Cars = ModelObject<CarsModel>;
