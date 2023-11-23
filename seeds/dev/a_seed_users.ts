import { Knex } from "knex";
import { encryptedPassword } from "../../function/encryptPassword";

const salt: number = 9;
const passwordSuperAdmin: string = "superadmin";
export async function seed(knex: Knex): Promise<void> {
  // Deletes ALL existing entries
  await knex("users").del();

  // Inserts seed entries
  await knex("users").insert([
    {
      username: "superadmin",
      email: "superadmin@gmail.com",
      password: await encryptedPassword(passwordSuperAdmin, salt),
      role: "superadmin",
    },
  ]);
}
