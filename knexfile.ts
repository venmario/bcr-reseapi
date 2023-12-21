import type { Knex } from "knex";
import "dotenv/config";
// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "postgresql",
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: "./database/seeds/dev"
    },
    migrations: {
      directory: "./database/migrations"
    }
  },
  production: {
    client: "pg",
    connection: process.env.DATABASE_URL,
    seeds: {
      directory: "./database/seeds/dev"
    },
    migrations: {
      directory: "./database/migrations"
    }
  }
};

module.exports = config;
