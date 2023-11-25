import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("username", 15).notNullable();
    table.string("email", 255).notNullable();
    table.string("password", 255).notNullable();
    table.string("role", 50).notNullable();
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("users");
}
