import { ModelObject } from "objection";
import { ModelWithValidator } from "./base";

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
}

export type Cars = ModelObject<CarsModel>;
