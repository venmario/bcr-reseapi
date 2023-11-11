import { Knex } from "knex";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable("cars", (table) => {
    table.uuid("id").defaultTo(knex.fn.uuid()).primary();
    table.string("plate").notNullable;
    table.string("manufacture").notNullable;
    table.string("model").notNullable;
    table.string("image").notNullable;
    table.integer("rentPerDay").notNullable;
    table.integer("capacity").notNullable;
    table.string("description").notNullable;
    table.datetime("availableAt").notNullable;
    table.string("transmission").notNullable;
    table.boolean("available").notNullable;
    table.string("type").notNullable;
    table.boolean("driver").notNullable;
    table.integer("year").notNullable;
    table.jsonb("options").notNullable;
    table.jsonb("specs").notNullable;
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable("cars");
}
