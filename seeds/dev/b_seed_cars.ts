import { Knex } from "knex";
import { CarsModel } from "../../models/car";
import { setAvailableat } from "../../function/availableAt";
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("cars").del();

  const response = await fetch(
    `https://raw.githubusercontent.com/fnurhidayat/probable-garbanzo/main/data/cars.json`
  );
  const cars = await response.json();
  // Inserts seed entries
  // console.log(objCars);
  await knex("cars").insert(
    cars.map((car: CarsModel) => {
      return {
        ...car,
        driver: Math.floor(Math.random() * 2) == 1 ? true : false,
        availableAt: setAvailableat(),
        specs: JSON.stringify(car.specs),
        options: JSON.stringify(car.options),
        created_at: new Date(),
        created_by: 1,
      };
    })
  );
}
